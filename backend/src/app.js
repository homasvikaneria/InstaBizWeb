const express = require('express');
const pool = require('../db/db');
const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({
      status: 'ok',
      message: 'InstaBizWeb API and database are running',
      database: 'connected'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      database: 'disconnected'
    });
  }
});

// Error Handling Middleware (must be registered after routes)
app.use(errorHandler);

module.exports = app;
