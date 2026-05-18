const express = require('express');
const mongoose = require('mongoose');
const Product = require('../../../models/Product');
const {
  buildProductFilter,
  buildProductSort,
  parseProductPagination
} = require('../../../utils/productQuery');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page, limit, skip } = parseProductPagination(req.query);
    const filter = buildProductFilter(req.query);
    const sort = buildProductSort(req.query);

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const categories = await Product.distinct('category');

    return res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
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
    console.error('API products list error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID.'
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    return res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('API product detail error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

module.exports = router;
