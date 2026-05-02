const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  "https://guidevera.com",
  "https://www.guidevera.com",
  "https://counsiling.guidevera.com",
  "https://counseling.guidevera.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4173",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".guidevera.com")) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
app.use('/api/blog', require('./routes/blog'));

app.get('/', (req, res) => {
  res.send('Guidevera API is running...');
});

const PORT = process.env.PORT || 5000;

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  
  // Ensure CORS headers are present even on errors
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith(".guidevera.com"))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
