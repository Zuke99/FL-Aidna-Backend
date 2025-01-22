const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const eventRoutes = require('./routes/event');
const paymentRoutes = require('./routes/payment')

// const authenticateUser = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, // Specify the exact origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));// Enable CORS for all routes and origins
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('App Is Running'));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
