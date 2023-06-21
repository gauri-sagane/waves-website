const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const dotenv = require("dotenv");
dotenv.config();

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// body parse
app.use(express.json());

// sanitize
app.use(mongoSanitize());

// routes
app.use('/api', routes)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})