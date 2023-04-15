const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router')
require('dotenv').config();

const protect = require('./modules/auth').protect;
const port = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],     // allow these methods
    credentials: true             // allow cookies to be sent with 
}));
app.use(express.json());
app.use('/api', protect, router);

app.listen(port, () => {
    console.log(`Server listnening on http://localhost:${port}`)
})