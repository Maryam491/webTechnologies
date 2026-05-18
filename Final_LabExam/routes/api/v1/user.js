const express = require('express');
const User = require('../../../models/User');
const verifyToken = require('../../../middleware/verifyToken');

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select('name email role createdAt updatedAt');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    return res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('API profile error:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch profile.'
    });
  }
});

module.exports = router;
