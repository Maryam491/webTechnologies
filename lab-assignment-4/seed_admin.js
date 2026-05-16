const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce_db';

async function run() {
  await mongoose.connect(MONGO);
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim();
  const name = process.env.ADMIN_NAME || 'Admin User';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  let user = await User.findOne({ email });
  if (user) {
    if (user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
      console.log('Existing user promoted to admin:', email);
    } else {
      console.log('Admin already exists:', email);
    }
    process.exit(0);
  }

  user = new User({ name, email, password, role: 'admin' });
  await user.save();
  console.log('Admin user created:', email, 'Password:', password);
  process.exit(0);
}

run().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
