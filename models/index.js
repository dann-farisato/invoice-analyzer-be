const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(`mongodb://localhost:27017/invoicEZ_USER_DB`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB...', err);
    });

module.exports = mongoose;