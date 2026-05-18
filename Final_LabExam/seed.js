const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  // NEW ARRIVAL
  { name: 'Summer Lawn Kurta', price: 3999, category: 'NEW ARRIVAL', rating: 4.8, stock: 45, description: 'Fresh summer collection with vibrant colors.', image: '/images/l3.jpg' },
  { name: 'Premium Cotton Dupatta', price: 1499, category: 'NEW ARRIVAL', rating: 4.6, stock: 60, description: 'Elegant cotton dupatta perfect for any occasion.', image: '/images/kid3.png' },
  { name: 'Designer Stitched Suit', price: 5999, category: 'NEW ARRIVAL', rating: 4.7, stock: 30, description: 'Latest designer stitched suit collection.', image: '/images/men3.jpg' },
  { name: 'Embroidered Shawl', price: 2499, category: 'NEW ARRIVAL', rating: 4.5, stock: 40, description: 'Hand-embroidered traditional shawl.', image: '/images/l4.jpg' },

  // SALE
  { name: 'Discounted Lawn Collection', price: 1999, category: 'SALE', rating: 4.3, stock: 80, description: '50% off on select lawn pieces.', image: '/images/l2.jpg', isOnSale: true },
  { name: 'Sale Unstitched Fabric', price: 799, category: 'SALE', rating: 4.2, stock: 100, description: 'Affordable unstitched fabric on sale.', image: '/images/kid2.png', isOnSale: true },
  { name: 'Clearance Ready-to-Wear', price: 2499, category: 'SALE', rating: 4.1, stock: 55, description: 'End of season clearance sale.', image: '/images/men2.jpg', isOnSale: true },
  { name: 'Flash Sale Kurtis', price: 899, category: 'SALE', rating: 4.4, stock: 70, description: 'Limited time flash sale on kurtis.', image: '/images/dress4.jpg', isOnSale: true },
  { name: 'Bargain Bridal Pieces', price: 1799, category: 'SALE', rating: 4.0, stock: 42, description: 'Special bridal designs at discounted prices.', image: '/images/dress1.jpg', isOnSale: true },
  { name: 'Sale Party Wear', price: 2199, category: 'SALE', rating: 4.3, stock: 30, description: 'Party wear dresses available on sale.', image: '/images/dress3.jpg', isOnSale: true },
  { name: 'Men’s Clearance Shirt', price: 1299, category: 'SALE', rating: 4.2, stock: 68, description: 'Clearance priced men’s shirts.', image: '/images/men1.jpg', isOnSale: true },
  { name: 'Discounted Kids Wear', price: 999, category: 'SALE', rating: 4.1, stock: 88, description: 'Children’s clothing on discount.', image: '/images/kid3.png', isOnSale: true },
  { name: 'Limited Offer Shawl', price: 1399, category: 'SALE', rating: 4.2, stock: 53, description: 'Shawls at limited offer prices.', image: '/images/l3.jpg', isOnSale: true },
  { name: 'Seasonal Footwear Sale', price: 1499, category: 'SALE', rating: 4.5, stock: 45, description: 'Shoes and sandals on sale.', image: '/images/shoe2.jpg', isOnSale: true },
  { name: 'Discounted Wallets', price: 799, category: 'SALE', rating: 4.0, stock: 72, description: 'Stylish wallets at sale price.', image: '/images/bag1.jpg', isOnSale: true },
  { name: 'Sale Fashion Accessories', price: 599, category: 'SALE', rating: 4.1, stock: 90, description: 'Accessories bundle with extra savings.', image: '/images/dec2.jpg', isOnSale: true },
  { name: 'Clearance Scarf Set', price: 699, category: 'SALE', rating: 4.1, stock: 110, description: 'Soft scarf sets on clearance.', image: '/images/l4.jpg', isOnSale: true },
  { name: 'Flash Discount Jeans', price: 1599, category: 'SALE', rating: 4.3, stock: 40, description: 'Jeans available at a limited discount.', image: '/images/men4.jpg', isOnSale: true },
  { name: 'Budget Evening Gown', price: 1899, category: 'SALE', rating: 4.2, stock: 37, description: 'Gowns for evening events on sale.', image: '/images/dress2.jpg', isOnSale: true },
  { name: 'Clearance Pajama Set', price: 999, category: 'SALE', rating: 4.0, stock: 85, description: 'Comfortable pajama sets at sale prices.', image: '/images/kid4.webp', isOnSale: true },
  { name: 'Discounted Sunglasses', price: 699, category: 'SALE', rating: 4.1, stock: 60, description: 'Stylish sunglasses on discount.', image: '/images/dec4.jpg', isOnSale: true },
  { name: 'Sale Denim Jacket', price: 2299, category: 'SALE', rating: 4.4, stock: 50, description: 'Trendy jackets in the sale section.', image: '/images/men3.jpg', isOnSale: true },
  { name: 'Budget Tote Bag', price: 899, category: 'SALE', rating: 4.2, stock: 75, description: 'Tote bags with a sale tag.', image: '/images/bag2.jpg', isOnSale: true },
  { name: 'Discounted Perfume Set', price: 2199, category: 'SALE', rating: 4.5, stock: 35, description: 'Fragrance gift sets on sale.', image: '/images/perfume1.webp', isOnSale: true },
  { name: 'Clearance Leather Belt', price: 499, category: 'SALE', rating: 4.0, stock: 90, description: 'Leather belts on clearance.', image: '/images/bag2.jpg', isOnSale: true },
  { name: 'Flash Sale Bracelet', price: 399, category: 'SALE', rating: 4.1, stock: 120, description: 'Bracelets at flash sale prices.', image: '/images/dec3.jpg', isOnSale: true },
  { name: 'Discounted Kids Shoes', price: 1099, category: 'SALE', rating: 4.3, stock: 45, description: 'Children’s shoes on markdown.', image: '/images/kid1.png', isOnSale: true },
  { name: 'Flash Sale Wallet', price: 649, category: 'SALE', rating: 4.0, stock: 78, description: 'Wallets on flash sale.', image: '/images/bag1.jpg', isOnSale: true },
  { name: 'Budget Silk Tie', price: 299, category: 'SALE', rating: 4.1, stock: 95, description: 'Silk ties with sale pricing.', image: '/images/men2.jpg', isOnSale: true },
  { name: 'Clearance Travel Pouch', price: 549, category: 'SALE', rating: 4.0, stock: 70, description: 'Travel pouches at clearance prices.', image: '/images/shoe3.jpg', isOnSale: true },
  { name: 'Sale Hosiery Pack', price: 349, category: 'SALE', rating: 4.1, stock: 82, description: 'Hosiery sets included in sale.', image: '/images/dress4.jpg', isOnSale: true },
  { name: 'Budget Wristwatch', price: 1299, category: 'SALE', rating: 4.2, stock: 40, description: 'Wristwatches discounted for sale.', image: '/images/dec1.jpg', isOnSale: true },
  { name: 'Sale Printed Tee', price: 699, category: 'SALE', rating: 4.1, stock: 65, description: 'Printed t-shirts at sale price.', image: '/images/men1.jpg', isOnSale: true },
  { name: 'Discount Evening Clutch', price: 849, category: 'SALE', rating: 4.2, stock: 58, description: 'Evening clutch bags on discount.', image: '/images/bag2.jpg', isOnSale: true },
  { name: 'Clearance Kid Hoodie', price: 1099, category: 'SALE', rating: 4.0, stock: 72, description: 'Kids hoodies on clearance.', image: '/images/kid1.png', isOnSale: true },
  { name: 'Sale Denim Skirt', price: 1299, category: 'SALE', rating: 4.1, stock: 44, description: 'Denim skirts with sale pricing.', image: '/images/dress3.jpg', isOnSale: true },
  { name: 'Budget Leather Sandals', price: 999, category: 'SALE', rating: 4.3, stock: 50, description: 'Leather sandals discounted.', image: '/images/shoe2.jpg', isOnSale: true },
  { name: 'Discount Travel Mug', price: 499, category: 'SALE', rating: 4.0, stock: 90, description: 'Travel mugs available on sale.', image: '/images/dec2.jpg', isOnSale: true },
  { name: 'Sale Party Earrings', price: 549, category: 'SALE', rating: 4.1, stock: 68, description: 'Party earrings discount bundle.', image: '/images/dec3.jpg', isOnSale: true },
  { name: 'Flash Sale Crop Top', price: 799, category: 'SALE', rating: 4.2, stock: 55, description: 'Crop tops at flash sale prices.', image: '/images/dress1.jpg', isOnSale: true },
  { name: 'Budget Linen Set', price: 1499, category: 'SALE', rating: 4.0, stock: 45, description: 'Linen sets in the sale section.', image: '/images/l1.jpg', isOnSale: true },
  { name: 'Clearance Anklet Set', price: 299, category: 'SALE', rating: 4.1, stock: 88, description: 'Anklet sets on clearance.', image: '/images/dec4.jpg', isOnSale: true },
  { name: 'Sale Bridal Necklace', price: 1799, category: 'SALE', rating: 4.3, stock: 36, description: 'Bridal necklaces on sale.', image: '/images/dress2.jpg', isOnSale: true },
  { name: 'Discount Running Shorts', price: 799, category: 'SALE', rating: 4.2, stock: 60, description: 'Running shorts available at a discount.', image: '/images/men4.jpg', isOnSale: true },
  { name: 'Flash Sale Beanie', price: 449, category: 'SALE', rating: 4.0, stock: 80, description: 'Beanies on flash sale.', image: '/images/kid3.png', isOnSale: true },
  { name: 'Budget Wristband Set', price: 199, category: 'SALE', rating: 4.1, stock: 110, description: 'Wristband packs on sale.', image: '/images/dec1.jpg', isOnSale: true },
  { name: 'Clearance Phone Case', price: 249, category: 'SALE', rating: 4.0, stock: 120, description: 'Phone cases at clearance pricing.', image: '/images/bag1.jpg', isOnSale: true },
  { name: 'Sale Sunglass Chain', price: 349, category: 'SALE', rating: 4.1, stock: 73, description: 'Sunglass chains available on sale.', image: '/images/dec2.jpg', isOnSale: true },
  { name: 'Discounted Bandana', price: 229, category: 'SALE', rating: 4.0, stock: 100, description: 'Bandanas on clearance sale.', image: '/images/l3.jpg', isOnSale: true },

  // LAWN
  { name: 'Classic Lawn Suit', price: 4499, category: 'LAWN', rating: 4.6, stock: 35, description: 'Traditional lawn suit with classic patterns.', image: '/images/l1.jpg' },
  { name: 'Digital Print Lawn', price: 3299, category: 'LAWN', rating: 4.4, stock: 48, description: 'Modern digital prints on soft lawn fabric.', image: '/images/l2.jpg' },
  { name: 'Embroidered Lawn Dupatta', price: 1899, category: 'LAWN', rating: 4.5, stock: 52, description: 'Beautifully embroidered lawn dupatta.', image: '/images/l3.jpg' },
  { name: 'Lawn Trouser', price: 1599, category: 'LAWN', rating: 4.3, stock: 65, description: 'Comfortable lawn trousers for any season.', image: '/images/l4.jpg' },

  // 2026
  { name: '2026 Collection Kurta', price: 4999, category: '2026', rating: 4.7, stock: 40, description: 'Exclusive 2026 collection launch.', image: '/images/u1.jpg' },
  { name: 'Trending 2026 Design', price: 5499, category: '2026', rating: 4.8, stock: 32, description: 'Latest trend in 2026 fashion collection.', image: '/images/kid1.png' },
  { name: '2026 Luxury Fabric', price: 6999, category: '2026', rating: 4.6, stock: 25, description: 'Premium quality luxury fabric from 2026.', image: '/images/men1.jpg' },
  { name: '2026 Modern Suit', price: 7499, category: '2026', rating: 4.9, stock: 20, description: 'Contemporary modern suit design for 2026.', image: '/images/dress1.jpg' },

  // UNSTITCHED
  { name: 'Unstitched Lawn Fabric', price: 1299, category: 'UNSTITCHED', rating: 4.4, stock: 75, description: 'Premium unstitched lawn fabric.', image: '/images/u1.jpg' },
  { name: 'Unstitched Cotton Suit', price: 1599, category: 'UNSTITCHED', rating: 4.3, stock: 88, description: 'High-quality unstitched cotton suit.', image: '/images/u2.jpg' },
  { name: 'Unstitched Silk Fabric', price: 2299, category: 'UNSTITCHED', rating: 4.5, stock: 42, description: 'Elegant unstitched silk material.', image: '/images/u3.jpg' },
  { name: 'Unstitched Wool Suit', price: 1899, category: 'UNSTITCHED', rating: 4.2, stock: 55, description: 'Warm unstitched wool suit fabric.', image: '/images/u4.jpg' },

  // READY TO WEAR
  { name: 'Ready-to-Wear Kurta', price: 2999, category: 'READY TO WEAR', rating: 4.6, stock: 50, description: 'Pre-stitched ready-to-wear kurta.', image: '/images/men4.jpg' },
  { name: 'Ready-to-Wear Suit', price: 4299, category: 'READY TO WEAR', rating: 4.7, stock: 35, description: 'Perfectly stitched ready-to-wear suit.', image: '/images/dress1.jpg' },
  { name: 'Ready-to-Wear Dress', price: 3299, category: 'READY TO WEAR', rating: 4.5, stock: 45, description: 'Elegant ready-to-wear dress collection.', image: '/images/l2.jpg' },
  { name: 'Ready-to-Wear Salwar Kameez', price: 2799, category: 'READY TO WEAR', rating: 4.4, stock: 60, description: 'Traditional ready-to-wear salwar kameez.', image: '/images/dress3.jpg' },

  // MEN
  { name: 'Men\'s Formal T-shirt Set', price: 3999, category: 'MEN', rating: 4.5, stock: 40, description: 'Formal mens shalwar kameez collection.', image: '/images/men1.jpg' },
  { name: 'Men\'s Casual Kurta', price: 2499, category: 'MEN', rating: 4.3, stock: 55, description: 'Comfortable casual kurta for men.', image: '/images/men2.jpg' },
  { name: 'Men\'s Premium Suit', price: 6999, category: 'MEN', rating: 4.6, stock: 28, description: 'Premium quality mens suit.', image: '/images/men3.jpg' },
  { name: 'Men\'s  Shalwar Kameez', price: 1899, category: 'MEN', rating: 4.2, stock: 70, description: 'Breathable lawn shirt for men.', image: '/images/men4.jpg' },

  // IDEAS
  { name: 'Ideas Home Collection', price: 2499, category: 'IDEAS', rating: 4.4, stock: 50, description: 'Innovative home design ideas collection.', image: '/images/dec1.jpg' },
  { name: 'Ideas Decoration Piece', price: 1599, category: 'IDEAS', rating: 4.3, stock: 65, description: 'Creative decoration pieces for your space.', image: '/images/dec2.jpg' },
  { name: 'Ideas Lifestyle Product', price: 3299, category: 'IDEAS', rating: 4.5, stock: 40, description: 'Unique lifestyle products with innovative design.', image: '/images/dec3.jpg' },
  { name: 'Ideas Home Accessory', price: 999, category: 'IDEAS', rating: 4.2, stock: 85, description: 'Stylish home accessories for modern living.', image: '/images/dec4.jpg' },

  // HOME
  { name: 'Premium Bedding Set', price: 4999, category: 'HOME', rating: 4.6, stock: 35, description: 'Luxury bedding set for comfortable sleep.', image: '/images/bedding1.jpg' },
  { name: 'Home Decor Cushion', price: 1499, category: 'HOME', rating: 4.4, stock: 60, description: 'Decorative cushion for living room.', image: '/images/bedding2.jpg' },
  { name: 'Bedsheet', price: 1199, category: 'HOME', rating: 4.3, stock: 75, description: 'Elegant table runner for dining.', image: '/images/bedding3.jpg' },
  { name: 'Premium Bedding Sets', price: 2299, category: 'HOME', rating: 4.5, stock: 45, description: 'Beautiful wall hanging for home decor.', image: '/images/bedding4.jpg' },

  // SALT
  { name: 'Salt Women Kurta', price: 2999, category: 'SALT', rating: 4.5, stock: 50, description: 'Modern salt collection for women.', image: '/images/dress1.jpg' },
  { name: 'Salt Men Shalwar Kameez', price: 3499, category: 'SALT', rating: 4.4, stock: 45, description: 'Contemporary salt collection for men.', image: '/images/men4.jpg' },
  { name: 'Salt Unstitched Fabric', price: 1699, category: 'SALT', rating: 4.3, stock: 65, description: 'Premium unstitched salt fabric.', image: '/images/dress3.jpg' },
  { name: 'Salt Accessories', price: 899, category: 'SALT', rating: 4.2, stock: 80, description: 'Stylish salt collection accessories.', image: '/images/dress4.jpg' },

  // KIDS
  { name: 'Kids Colorful Kurta', price: 1299, category: 'KIDS', rating: 4.6, stock: 70, description: 'Vibrant kurta for kids in various colors.', image: '/images/kid1.png' },
  { name: 'Kids Casual Outfit', price: 1599, category: 'KIDS', rating: 4.4, stock: 60, description: 'Comfortable casual outfit for children.', image: '/images/kid2.png' },
  { name: 'Kids Fancy Dress', price: 2199, category: 'KIDS', rating: 4.7, stock: 40, description: 'Beautiful fancy dress for kids.', image: '/images/kid3.png' },
  { name: 'Kids Unstitched Suit', price: 899, category: 'KIDS', rating: 4.3, stock: 85, description: 'Affordable unstitched suit for kids.', image: '/images/kid4.webp' },

  // SHOES & BAGS
  { name: 'Designer Leather Handbag', price: 4999, category: 'SHOES & BAGS', rating: 4.6, stock: 30, description: 'Premium designer leather handbag.', image: '/images/bag1.jpg' },
  { name: 'Casual Canvas Shoes', price: 1899, category: 'SHOES & BAGS', rating: 4.4, stock: 50, description: 'Comfortable casual canvas shoes.', image: '/images/shoe2.jpg' },
  { name: 'Formal Leather Shoes', price: 3499, category: 'SHOES & BAGS', rating: 4.5, stock: 40, description: 'Elegant formal leather shoes.', image: '/images/shoe2.jpg' },
  { name: 'Traditional Mojari', price: 1299, category: 'SHOES & BAGS', rating: 4.3, stock: 60, description: 'Traditional decorated mojari shoes.', image: '/images/shoe3.jpg' },
  { name: 'Clutch Bag', price: 1599, category: 'SHOES & BAGS', rating: 4.2, stock: 55, description: 'Stylish clutch bag for parties.', image: '/images/bag2.jpg' },

  // FRAGRANCES
  { name: 'Floral Perfume', price: 2499, category: 'FRAGRANCES', rating: 4.7, stock: 40, description: 'Beautiful floral fragrance for women.', image: '/images/perfume1.webp' },
  { name: 'Woody Cologne', price: 2999, category: 'FRAGRANCES', rating: 4.6, stock: 35, description: 'Classic woody cologne for men.', image: '/images/perfume2.webp' },
  { name: 'Fresh Citrus Spray', price: 1999, category: 'FRAGRANCES', rating: 4.4, stock: 50, description: 'Refreshing citrus body spray.', image: '/images/perfume3.webp' },
  { name: 'Oud Premium Fragrance', price: 5999, category: 'FRAGRANCES', rating: 4.8, stock: 20, description: 'Luxury oud-based premium fragrance.', image: '/images/perfume4.webp' },

  // LOOK BOOK
  { name: 'Look Book Spring Collection', price: 6999, category: 'LOOK BOOK', rating: 4.7, stock: 25, description: 'Complete spring collection look book.', image: '/images/lookbook1.webp' },
  { name: 'Look Book Fashion Guide', price: 3999, category: 'LOOK BOOK', rating: 4.5, stock: 35, description: 'Fashion styling guide with look book.', image: '/images/lookbook2.webp' },
  { name: 'Look Book Summer Trends', price: 4999, category: 'LOOK BOOK', rating: 4.6, stock: 30, description: 'Latest summer trends in our look book.', image: '/images/lookbook3.webp' },
  { name: 'Look Book Style Collection', price: 5499, category: 'LOOK BOOK', rating: 4.8, stock: 22, description: 'Curated style collection in look book format.', image: '/images/lookbook4.webp' }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce_db');

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log('Database seeded successfully with 78 products!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();