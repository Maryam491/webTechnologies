const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const Product = require('./models/Product');

const app = express();
const port = 3002;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  }
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce_db').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
// Serve static files from public directory (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
// Also serve files from root for backward compatibility
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'admin-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Admin helper utilities
function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.redirect('/admin/login');
}

function validateProductFields(body) {
  const errors = [];
  if (!body.name || !body.name.trim()) errors.push('Product name is required.');
  if (!body.category || !body.category.trim()) errors.push('Category is required.');
  if (!body.price || Number.isNaN(parseFloat(body.price))) errors.push('A valid price is required.');
  if (!body.stock || Number.isNaN(parseInt(body.stock, 10))) errors.push('Stock quantity is required.');
  return errors;
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};

    // Search by name
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }

    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseFloat(req.query.maxPrice);
      }
    }

    // Sorting
    let sort = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc':
          sort.price = 1;
          break;
        case 'price_desc':
          sort.price = -1;
          break;
        case 'rating_desc':
          sort.rating = -1;
          break;
        case 'name_asc':
          sort.name = 1;
          break;
        default:
          sort.createdAt = -1;
      }
    } else {
      sort.createdAt = -1;
    }

    // Get products with filters and pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get unique categories for filter dropdown
    const categories = await Product.distinct('category');

    res.render('products', {
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      categories,
      filters: {
        search: req.query.search || '',
        category: req.query.category || 'all',
        minPrice: req.query.minPrice || '',
        maxPrice: req.query.maxPrice || '',
        sort: req.query.sort || ''
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/admin', (req, res) => {
  if (req.session?.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  return res.redirect('/admin/login');
});

app.get('/admin/login', (req, res) => {
  res.render('admin-login', { error: null });
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.isAdmin = true;
    return res.redirect('/admin/dashboard');
  }
  return res.render('admin-login', { error: 'Invalid admin credentials.' });
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

app.get('/admin/dashboard', requireAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin-dashboard', { products });
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/admin/products/new', requireAdmin, (req, res) => {
  res.render('admin-product-form', {
    product: {},
    action: '/admin/products/new',
    formTitle: 'Create New Product',
    buttonText: 'Create Product',
    errors: []
  });
});

app.post('/admin/products/new', requireAdmin, upload.single('image'), async (req, res) => {
  const errors = validateProductFields(req.body);
  const productData = {
    name: req.body.name?.trim(),
    category: req.body.category?.trim(),
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock, 10),
    rating: parseFloat(req.body.rating) || 0,
    description: req.body.description?.trim()
  };

  if (req.file) {
    productData.image = `/uploads/${req.file.filename}`;
  }

  if (errors.length) {
    return res.render('admin-product-form', {
      product: { ...productData, image: productData.image },
      action: '/admin/products/new',
      formTitle: 'Create New Product',
      buttonText: 'Create Product',
      errors
    });
  }

  try {
    await Product.create(productData);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error creating product:', error);
    errors.push('Unable to create product. Please try again.');
    res.render('admin-product-form', {
      product: productData,
      action: '/admin/products/new',
      formTitle: 'Create New Product',
      buttonText: 'Create Product',
      errors
    });
  }
});

app.get('/admin/products/:id/edit', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect('/admin/dashboard');
    }
    res.render('admin-product-form', {
      product,
      action: `/admin/products/${product._id}/edit`,
      formTitle: 'Edit Product',
      buttonText: 'Save Changes',
      errors: []
    });
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.redirect('/admin/dashboard');
  }
});

app.post('/admin/products/:id/edit', requireAdmin, upload.single('image'), async (req, res) => {
  const errors = validateProductFields(req.body);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.redirect('/admin/dashboard');
    }

    product.name = req.body.name?.trim();
    product.category = req.body.category?.trim();
    product.price = parseFloat(req.body.price);
    product.stock = parseInt(req.body.stock, 10);
    product.rating = parseFloat(req.body.rating) || 0;
    product.description = req.body.description?.trim();

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    if (errors.length) {
      return res.render('admin-product-form', {
        product,
        action: `/admin/products/${product._id}/edit`,
        formTitle: 'Edit Product',
        buttonText: 'Save Changes',
        errors
      });
    }

    await product.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error updating product:', error);
    errors.push('Unable to save changes. Please try again.');
    res.render('admin-product-form', {
      product: {
        _id: req.params.id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        rating: req.body.rating,
        description: req.body.description,
        image: req.body.image
      },
      action: `/admin/products/${req.params.id}/edit`,
      formTitle: 'Edit Product',
      buttonText: 'Save Changes',
      errors
    });
  }
});

app.post('/admin/products/:id/delete', requireAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
  res.redirect('/admin/dashboard');
});

// Category routes - redirect to products page with category filter
app.get('/new-arrival', (req, res) => {
  res.redirect('/products?category=NEW ARRIVAL');
});

app.get('/sale', (req, res) => {
  res.redirect('/products?category=SALE');
});

app.get('/lawn-2026', (req, res) => {
  res.redirect('/products?category=LAWN');
});

app.get('/unstitched', (req, res) => {
  res.redirect('/products?category=UNSTITCHED');
});

app.get('/ready-to-wear', (req, res) => {
  res.redirect('/products?category=READY TO WEAR');
});

app.get('/men', (req, res) => {
  res.redirect('/products?category=MEN');
});

app.get('/ideas', (req, res) => {
  res.redirect('/products?category=IDEAS');
});

app.get('/home', (req, res) => {
  res.redirect('/');
});

app.get('/salt', (req, res) => {
  res.redirect('/products?category=SALT');
});

app.get('/kids', (req, res) => {
  res.redirect('/products?category=KIDS');
});

app.get('/shoes-bags', (req, res) => {
  res.redirect('/products?category=SHOES & BAGS');
});

app.get('/fragrances', (req, res) => {
  res.redirect('/products?category=FRAGRANCES');
});

app.get('/look-book', (req, res) => {
  res.redirect('/products?category=LOOK BOOK');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});