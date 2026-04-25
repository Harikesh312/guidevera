const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const email = 'admin@gmail.com';
    const password = 'admin123';

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin user already exists!');
      process.exit();
    }

    user = new User({
      name: 'Admin',
      email,
      password,
      role: 'admin'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log('Admin user created successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
