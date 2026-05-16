# Lab Task 2 - Express E-commerce Application

This is an Express.js e-commerce application with dynamic product catalog functionality.

## How to Run

1. Ensure MongoDB is installed and running locally.

2. Install dependencies:
   ```
   npm install
   ```

3. Seed the database with sample products:
   ```
   node seed.js
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3001`

## Features

- **Dynamic Product Catalog** (`/products`): Database-driven product display with pagination, filtering, and sorting
- Navigation links route through Express.js
- Each navigation item leads to a separate page
- Static files (CSS, JS, images) are served correctly
- Responsive design maintained

## New Features - Product Catalog

### Database Integration
- MongoDB with Mongoose ODM
- Product schema includes: name, price, category, rating, stock
- 30 sample products seeded

### Pagination
- 8 products per page
- Previous/Next navigation
- Page number controls
- Query parameter: `?page=n`

### Filtering & Searching
- **Search Bar**: Filter products by name (case-insensitive)
- **Category Filter**: Dropdown to filter by category
- **Price Range**: Min and max price filters
- **Sorting**: Sort by name, price (asc/desc), rating (desc)

### URL Parameters
- `?search=term` - Search products
- `?category=Electronics` - Filter by category
- `?minPrice=10&maxPrice=100` - Price range
- `?sort=price_asc` - Sort options
- `?page=2` - Pagination

### Image Handling Fixes
- **Static File Serving**: Images served from `public/` directory
- **Fallback Images**: Automatic fallback to placeholder for broken images
- **Loading States**: Smooth loading transitions without layout shifts
- **Error Prevention**: Prevents infinite image reload loops
- **Lazy Loading**: Images load as needed for better performance

## Routes

- `/` - Home page (original landing page)
- `/products` - Dynamic product catalog
- `/new-arrival` - New Arrival page
- `/sale` - Sale page
- `/lawn-2026` - Lawn 2026 page
- `/unstitched` - Unstitched page
- `/ready-to-wear` - Ready to Wear page
- `/men` - Men page
- `/ideas` - Ideas page
- `/home` - Home page
- `/salt` - Salt page
- `/kids` - Kids page
- `/shoes-bags` - Shoes & Bags page
- `/fragrances` - Fragrances page
- `/look-book` - Look Book page

## Technologies Used

- Node.js
- Express.js
- EJS templating
- MongoDB
- Mongoose ODM