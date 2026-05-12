const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  // NEW ARRIVAL
  { name: 'Summer Lawn Kurta', price: 3999, category: 'NEW ARRIVAL', rating: 4.8, stock: 45, description: 'Fresh summer collection with vibrant colors.', image: '/images/product01.jpg' },
  { name: 'Premium Cotton Dupatta', price: 1499, category: 'NEW ARRIVAL', rating: 4.6, stock: 60, description: 'Elegant cotton dupatta perfect for any occasion.', image: '/images/product02.jpg' },
  { name: 'Designer Stitched Suit', price: 5999, category: 'NEW ARRIVAL', rating: 4.7, stock: 30, description: 'Latest designer stitched suit collection.', image: '/images/product03.jpg' },
  { name: 'Embroidered Shawl', price: 2499, category: 'NEW ARRIVAL', rating: 4.5, stock: 40, description: 'Hand-embroidered traditional shawl.', image: '/images/product04.jpg' },

  // SALE
  { name: 'Discounted Lawn Collection', price: 1999, category: 'SALE', rating: 4.3, stock: 80, description: '50% off on select lawn pieces.', image: '/images/product05.jpg' },
  { name: 'Sale Unstitched Fabric', price: 799, category: 'SALE', rating: 4.2, stock: 100, description: 'Affordable unstitched fabric on sale.', image: '/images/product06.jpg' },
  { name: 'Clearance Ready-to-Wear', price: 2499, category: 'SALE', rating: 4.1, stock: 55, description: 'End of season clearance sale.', image: '/images/product07.jpg' },
  { name: 'Flash Sale Kurtis', price: 899, category: 'SALE', rating: 4.4, stock: 70, description: 'Limited time flash sale on kurtis.', image: '/images/product08.jpg' },

  // LAWN
  { name: 'Classic Lawn Suit', price: 4499, category: 'LAWN', rating: 4.6, stock: 35, description: 'Traditional lawn suit with classic patterns.', image: '/images/product09.jpg' },
  { name: 'Digital Print Lawn', price: 3299, category: 'LAWN', rating: 4.4, stock: 48, description: 'Modern digital prints on soft lawn fabric.', image: '/images/product10.jpg' },
  { name: 'Embroidered Lawn Dupatta', price: 1899, category: 'LAWN', rating: 4.5, stock: 52, description: 'Beautifully embroidered lawn dupatta.', image: '/images/product11.jpg' },
  { name: 'Lawn Trouser', price: 1599, category: 'LAWN', rating: 4.3, stock: 65, description: 'Comfortable lawn trousers for any season.', image: '/images/product12.jpg' },

  // 2026
  { name: '2026 Collection Kurta', price: 4999, category: '2026', rating: 4.7, stock: 40, description: 'Exclusive 2026 collection launch.', image: '/images/product13.jpg' },
  { name: 'Trending 2026 Design', price: 5499, category: '2026', rating: 4.8, stock: 32, description: 'Latest trend in 2026 fashion collection.', image: '/images/product14.jpg' },
  { name: '2026 Luxury Fabric', price: 6999, category: '2026', rating: 4.6, stock: 25, description: 'Premium quality luxury fabric from 2026.', image: '/images/product15.jpg' },
  { name: '2026 Modern Suit', price: 7499, category: '2026', rating: 4.9, stock: 20, description: 'Contemporary modern suit design for 2026.', image: '/images/product16.jpg' },

  // UNSTITCHED
  { name: 'Unstitched Lawn Fabric', price: 1299, category: 'UNSTITCHED', rating: 4.4, stock: 75, description: 'Premium unstitched lawn fabric.', image: '/images/product17.jpg' },
  { name: 'Unstitched Cotton Suit', price: 1599, category: 'UNSTITCHED', rating: 4.3, stock: 88, description: 'High-quality unstitched cotton suit.', image: '/images/product18.jpg' },
  { name: 'Unstitched Silk Fabric', price: 2299, category: 'UNSTITCHED', rating: 4.5, stock: 42, description: 'Elegant unstitched silk material.', image: '/images/product19.jpg' },
  { name: 'Unstitched Wool Suit', price: 1899, category: 'UNSTITCHED', rating: 4.2, stock: 55, description: 'Warm unstitched wool suit fabric.', image: '/images/product20.jpg' },

  // READY TO WEAR
  { name: 'Ready-to-Wear Kurta', price: 2999, category: 'READY TO WEAR', rating: 4.6, stock: 50, description: 'Pre-stitched ready-to-wear kurta.', image: '/images/product21.jpg' },
  { name: 'Ready-to-Wear Suit', price: 4299, category: 'READY TO WEAR', rating: 4.7, stock: 35, description: 'Perfectly stitched ready-to-wear suit.', image: '/images/product22.jpg' },
  { name: 'Ready-to-Wear Dress', price: 3299, category: 'READY TO WEAR', rating: 4.5, stock: 45, description: 'Elegant ready-to-wear dress collection.', image: '/images/product23.jpg' },
  { name: 'Ready-to-Wear Salwar Kameez', price: 2799, category: 'READY TO WEAR', rating: 4.4, stock: 60, description: 'Traditional ready-to-wear salwar kameez.', image: '/images/product24.jpg' },

  // MEN
  { name: 'Men\'s Formal Shalwar Kameez', price: 3999, category: 'MEN', rating: 4.5, stock: 40, description: 'Formal mens shalwar kameez collection.', image: '/images/product25.jpg' },
  { name: 'Men\'s Casual Kurta', price: 2499, category: 'MEN', rating: 4.3, stock: 55, description: 'Comfortable casual kurta for men.', image: '/images/product26.jpg' },
  { name: 'Men\'s Premium Suit', price: 6999, category: 'MEN', rating: 4.6, stock: 28, description: 'Premium quality mens suit.', image: '/images/product27.jpg' },
  { name: 'Men\'s Lawn Shirt', price: 1899, category: 'MEN', rating: 4.2, stock: 70, description: 'Breathable lawn shirt for men.', image: '/images/product28.jpg' },

  // IDEAS
  { name: 'Ideas Home Collection', price: 2499, category: 'IDEAS', rating: 4.4, stock: 50, description: 'Innovative home design ideas collection.', image: '/images/product29.jpg' },
  { name: 'Ideas Decoration Piece', price: 1599, category: 'IDEAS', rating: 4.3, stock: 65, description: 'Creative decoration pieces for your space.', image: '/images/product30.jpg' },
  { name: 'Ideas Lifestyle Product', price: 3299, category: 'IDEAS', rating: 4.5, stock: 40, description: 'Unique lifestyle products with innovative design.', image: '/images/product21.jpg' },
  { name: 'Ideas Home Accessory', price: 999, category: 'IDEAS', rating: 4.2, stock: 85, description: 'Stylish home accessories for modern living.', image: '/images/product22.jpg' },

  // HOME
  { name: 'Premium Bedding Set', price: 4999, category: 'HOME', rating: 4.6, stock: 35, description: 'Luxury bedding set for comfortable sleep.', image: '/images/product23.jpg' },
  { name: 'Home Decor Cushion', price: 1499, category: 'HOME', rating: 4.4, stock: 60, description: 'Decorative cushion for living room.', image: '/images/product24.jpg' },
  { name: 'Table Runner', price: 1199, category: 'HOME', rating: 4.3, stock: 75, description: 'Elegant table runner for dining.', image: '/images/product25.jpg' },
  { name: 'Home Wall Hanging', price: 2299, category: 'HOME', rating: 4.5, stock: 45, description: 'Beautiful wall hanging for home decor.', image: '/images/product26.jpg' },

  // SALT
  { name: 'Salt Women Kurta', price: 2999, category: 'SALT', rating: 4.5, stock: 50, description: 'Modern salt collection for women.', image: '/images/product27.jpg' },
  { name: 'Salt Men Shalwar Kameez', price: 3499, category: 'SALT', rating: 4.4, stock: 45, description: 'Contemporary salt collection for men.', image: '/images/product28.jpg' },
  { name: 'Salt Unstitched Fabric', price: 1699, category: 'SALT', rating: 4.3, stock: 65, description: 'Premium unstitched salt fabric.', image: '/images/product29.jpg' },
  { name: 'Salt Accessories', price: 899, category: 'SALT', rating: 4.2, stock: 80, description: 'Stylish salt collection accessories.', image: '/images/product30.jpg' },

  // KIDS
  { name: 'Kids Colorful Kurta', price: 1299, category: 'KIDS', rating: 4.6, stock: 70, description: 'Vibrant kurta for kids in various colors.', image: '/images/product11.jpg' },
  { name: 'Kids Casual Outfit', price: 1599, category: 'KIDS', rating: 4.4, stock: 60, description: 'Comfortable casual outfit for children.', image: '/images/product12.jpg' },
  { name: 'Kids Fancy Dress', price: 2199, category: 'KIDS', rating: 4.7, stock: 40, description: 'Beautiful fancy dress for kids.', image: '/images/product13.jpg' },
  { name: 'Kids Unstitched Suit', price: 899, category: 'KIDS', rating: 4.3, stock: 85, description: 'Affordable unstitched suit for kids.', image: '/images/product14.jpg' },

  // SHOES & BAGS
  { name: 'Designer Leather Handbag', price: 4999, category: 'SHOES & BAGS', rating: 4.6, stock: 30, description: 'Premium designer leather handbag.', image: '/images/product25.jpg' },
  { name: 'Casual Canvas Shoes', price: 1899, category: 'SHOES & BAGS', rating: 4.4, stock: 50, description: 'Comfortable casual canvas shoes.', image: '/images/product26.jpg' },
  { name: 'Formal Leather Shoes', price: 3499, category: 'SHOES & BAGS', rating: 4.5, stock: 40, description: 'Elegant formal leather shoes.', image: '/images/product27.jpg' },
  { name: 'Traditional Mojari', price: 1299, category: 'SHOES & BAGS', rating: 4.3, stock: 60, description: 'Traditional decorated mojari shoes.', image: '/images/product28.jpg' },
  { name: 'Clutch Bag', price: 1599, category: 'SHOES & BAGS', rating: 4.2, stock: 55, description: 'Stylish clutch bag for parties.', image: '/images/product29.jpg' },

  // FRAGRANCES
  { name: 'Floral Perfume', price: 2499, category: 'FRAGRANCES', rating: 4.7, stock: 40, description: 'Beautiful floral fragrance for women.', image: '/images/product30.jpg' },
  { name: 'Woody Cologne', price: 2999, category: 'FRAGRANCES', rating: 4.6, stock: 35, description: 'Classic woody cologne for men.', image: '/images/product30.jpg' },
  { name: 'Fresh Citrus Spray', price: 1999, category: 'FRAGRANCES', rating: 4.4, stock: 50, description: 'Refreshing citrus body spray.', image: '/images/product30.jpg' },
  { name: 'Oud Premium Fragrance', price: 5999, category: 'FRAGRANCES', rating: 4.8, stock: 20, description: 'Luxury oud-based premium fragrance.', image: '/images/product30.jpg' },

  // LOOK BOOK
  { name: 'Look Book Spring Collection', price: 6999, category: 'LOOK BOOK', rating: 4.7, stock: 25, description: 'Complete spring collection look book.', image: '/images/product24.jpg' },
  { name: 'Look Book Fashion Guide', price: 3999, category: 'LOOK BOOK', rating: 4.5, stock: 35, description: 'Fashion styling guide with look book.', image: '/images/product25.jpg' },
  { name: 'Look Book Summer Trends', price: 4999, category: 'LOOK BOOK', rating: 4.6, stock: 30, description: 'Latest summer trends in our look book.', image: '/images/product26.jpg' },
  { name: 'Look Book Style Collection', price: 5499, category: 'LOOK BOOK', rating: 4.8, stock: 22, description: 'Curated style collection in look book format.', image: '/images/product17.jpg' }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_db');

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log('Database seeded successfully with 30 products!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();