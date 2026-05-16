const express = require('express');
const authRoutes = require('./auth');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const userRoutes = require('./user');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/user', userRoutes);

module.exports = router;
