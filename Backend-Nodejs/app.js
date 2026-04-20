const express = require('express');
const cors = require('cors');  
const bookRoutes = require('./Routes/BookRoutes.js');
const serviceRoutes = require("./Routes/ServiceRoutes.js");
const inventoryRoutes = require('./Routes/InventoryRoutes.js');



const app = express();
app.use(cors())
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', bookRoutes);
app.use('/service', serviceRoutes);
app.use('/inventory', inventoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

module.exports = app;