const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/new-arrival', (req, res) => {
  res.send('<h1>New Arrival</h1><p>Welcome to our New Arrival section!</p><a href="/">Back to Home</a>');
});

app.get('/sale', (req, res) => {
  res.send('<h1>Sale</h1><p>Check out our amazing sale offers!</p><a href="/">Back to Home</a>');
});

app.get('/lawn-2026', (req, res) => {
  res.send('<h1>Lawn 2026</h1><p>Explore our Lawn 2026 collection!</p><a href="/">Back to Home</a>');
});

app.get('/unstitched', (req, res) => {
  res.send('<h1>Unstitched</h1><p>Discover our Unstitched collection!</p><a href="/">Back to Home</a>');
});

app.get('/ready-to-wear', (req, res) => {
  res.send('<h1>Ready to Wear</h1><p>Shop our Ready to Wear collection!</p><a href="/">Back to Home</a>');
});

app.get('/men', (req, res) => {
  res.send('<h1>Men</h1><p>Explore men\'s fashion!</p><a href="/">Back to Home</a>');
});

app.get('/ideas', (req, res) => {
  res.send('<h1>Ideas</h1><p>Get inspired with our Ideas!</p><a href="/">Back to Home</a>');
});

app.get('/home', (req, res) => {
  res.send('<h1>Home</h1><p>Shop home essentials!</p><a href="/">Back to Home</a>');
});

app.get('/salt', (req, res) => {
  res.send('<h1>Salt</h1><p>Discover Salt collection!</p><a href="/">Back to Home</a>');
});

app.get('/kids', (req, res) => {
  res.send('<h1>Kids</h1><p>Shop for kids!</p><a href="/">Back to Home</a>');
});

app.get('/shoes-bags', (req, res) => {
  res.send('<h1>Shoes & Bags</h1><p>Find the perfect shoes and bags!</p><a href="/">Back to Home</a>');
});

app.get('/fragrances', (req, res) => {
  res.send('<h1>Fragrances</h1><p>Choose your favorite fragrances!</p><a href="/">Back to Home</a>');
});

app.get('/look-book', (req, res) => {
  res.send('<h1>Look Book</h1><p>Browse our Look Book!</p><a href="/">Back to Home</a>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});