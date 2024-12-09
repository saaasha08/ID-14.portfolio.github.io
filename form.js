const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS for frontend-backend communication

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable cross-origin requests

const port = 5500;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB is connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Define schema and model
const Schema = mongoose.Schema;
const dataschema = new Schema({
    name: String,
    email: String,
    message: String,
});
const Data = mongoose.model('Data', dataschema);

// POST: Save data
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const newData = new Data({ name, email, message });
    newData.save()
        .then(() => res.send('Data Submitted Successfully'))
        .catch((err) => res.status(500).send('Error saving data: ' + err.message));
});

// GET: Retrieve all data
app.get('/data', (req, res) => {
    Data.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).send('Error retrieving data: ' + err.message));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});