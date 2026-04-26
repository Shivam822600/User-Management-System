require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Static folder for images
app.use('/uploads', express.static(uploadDir));

// Route Files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

// Mount Routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
