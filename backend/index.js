require('dotenv').config();
const express = require('express');
const app = express();
const connectdb = require('./config/db');
const contactRoute = require('./routes/contactRoute');

// Routes
const authRoute = require('./routes/authRoute');

// Middlewares
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API Routes
app.use('/api/auth', authRoute);
app.use('/api', contactRoute);

// Database + Server Start
const PORT = process.env.PORT || 3000;

connectdb(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('DB Connection Error:', err);
        process.exit(1); // stop server if DB fails
    });
