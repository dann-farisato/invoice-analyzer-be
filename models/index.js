const mongoose = require('mongoose');
// dotenv
require('dotenv').config();
const uri = process.env.MONGO_URI.toString();

mongoose.set('strictQuery', false);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB...', err);
    });

module.exports = mongoose;