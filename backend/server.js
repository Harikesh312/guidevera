const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://guidevera.com",
    "http://localhost:3000",  // Next.js frontend
    "http://localhost:5173",  // Vite landing page (dev)
    "http://localhost:4173",  // Vite landing page (preview)
  ],
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected to Guidevera'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/counseling', require('./routes/counseling'));
app.use('/api/roadmap', require('./routes/roadmap'));
app.use('/api/college-apply', require('./routes/collegeApply'));
app.use('/api/leads', require('./routes/leads'));

app.get('/', (req, res) => {
  res.send('Guidevera API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
