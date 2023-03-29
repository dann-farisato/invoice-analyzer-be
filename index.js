const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router')
require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server listnening on http://localhost:${port}`)
})