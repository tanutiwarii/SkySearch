// backend/db.js

const mongoose = require('mongoose');

// Replace the string below with your MongoDB URI.
const MONGO_URI = 'mongodb://localhost:27017/aerobook';  // Or your actual MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
