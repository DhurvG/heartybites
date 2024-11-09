// src/server.js

const express = require("express");

const cors = require("cors");

const connectDB = require("./db");

const profileRoutes = require("./routes/profileRoutes");

const authRoutes = require("./routes/authroutes");

const noteRoutes = require('./routes/noteRoutes');

const recipeRoutes = require('./routes/recipeRoutes');

const { protect } = require("./middleware/authMiddleware.js");

require("dotenv").config();



const app = express();



// Simplified CORS configuration

app.use(cors({

    origin: ["http://localhost:5001", "http://localhost:3000"],

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization']

}));



// Body parser middleware - place this BEFORE the logging middleware

app.use(express.json());



// Logging middleware

app.use((req, res, next) => {

    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    if (req.body) console.log('Request Body:', req.body);

    next();

});



// Connect to MongoDB

connectDB().then(() => {

    console.log('MongoDB connected successfully');

}).catch(err => {

    console.error('MongoDB connection error:', err);

});



// Test route

app.get('/api/test', (req, res) => {

    res.json({ message: 'Server is working' });

});



// Routes

app.use("/api/auth", authRoutes);

app.use("/api/profiles", protect, profileRoutes);

app.use('/api/notes', noteRoutes);

app.use('/api/recipes', recipeRoutes);



// Error handling

app.use((err, req, res, next) => {

    console.error('Error:', err);

    res.status(500).json({

        error: 'Server error',

        message: err.message

    });

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

    console.log(`Server ready at http://localhost:${PORT}`);

});
