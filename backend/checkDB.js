const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({ email: 'admin@gmail.com' });
    console.log("Found admin users:", users);
    process.exit();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
checkDB();
