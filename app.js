const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the cors package
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const eventRoutes = require('./routes/event');
const paymentRoutes = require('./routes/payment');
const adRoutes = require('./routes/ads');
const subsribeWebinarsAndPodcastsRoutes = require('./routes/webinarAndPodcastUser');
const statsRoutes = require('./routes/webinarAndPodcastStats');
const webinarRoutes = require('./routes/webinar');
const podcastRoutes = require('./routes/podcast');
const newsRoutes = require('./routes/news');
const couponRoutes = require('./routes/coupon');
const landingBannerRoutes = require('./routes/landingBanner');
const webinarBannerRoutes = require('./routes/webinarBanner');
const eventDetailsBannerRoutes = require('./routes/eventDetailsBanner');
const newsBannerRoutes = require('./routes/newsBanner');
const exposBannerRoutes = require('./routes/exposBanner');
const videosRoutes = require('./routes/video');
const mailRoutes = require('./routes/mail');
const HeaderLogoRoutes = require('./routes/headerLogo');
const FooterLogoRoutes = require('./routes/footerLogo')

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
// app.get('/', (req, res) => res.send('App Is Running'));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/subscribe-to-webinars-and-podcasts', subsribeWebinarsAndPodcastsRoutes);
app.use('/api/webinar-and-podcast-stats', statsRoutes);
app.use('/api/webinars', webinarRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/coupons', couponRoutes)
app.use('/api/landing-banner', landingBannerRoutes)
app.use('/api/webinar-banner', webinarBannerRoutes)
app.use('/api/event-details-banner', eventDetailsBannerRoutes)
app.use('/api/news-banner', newsBannerRoutes)
app.use('/api/expos-banner', exposBannerRoutes)
app.use('/api/videos', videosRoutes)
app.use('/api/mail', mailRoutes)
app.use('/api/header', HeaderLogoRoutes)
app.use('/api/footer', FooterLogoRoutes)
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive handles nested paths
  console.log('✅ uploads folder created automatically');
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use(express.static(path.join(__dirname,'dist')))
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'dist') });
});

app.listen(PORT, () => console.log(`Server running on port -> ${PORT}`));
