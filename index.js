const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router')

app.use(cors());
app.use(express.json())
app.use(router)

app.listen(3007, () => {
    console.log('Server listnening on http://localhost:3007')
})