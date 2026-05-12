const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
const port = 3002;

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