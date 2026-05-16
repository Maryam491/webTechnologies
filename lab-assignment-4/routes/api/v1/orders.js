const express = require('express');
const mongoose = require('mongoose');
const Order = require('../../../models/Order');
const Product = require('../../../models/Product');
const verifyToken = require('../../../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order must include at least one item.'
    });
  }

  try {
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const productId = item.productId || item.product;
      const quantity = parseInt(item.quantity, 10);

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: 'Each item must include a valid productId.'
        });
      }

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have a quantity of at least 1.'
        });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${productId}`
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}`
        });
      }

      const lineTotal = product.price * quantity;
      total += lineTotal;
      orderItems.push({
        product: product._id,
        name: product.name,
        quantity,
        price: product.price
      });

      product.stock -= quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user.user_id,
      items: orderItems,
      total
    });

    const populated = await Order.findById(order._id).populate('items.product', 'name image category');

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      data: populated
    });
  } catch (err) {
    console.error('API create order error:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to create order. Please try again.'
    });
  }
});

module.exports = router;
