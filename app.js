const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes and origins
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('POS App API'));
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
