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

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected resource' });
});
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
}

app.listen(port, () => {
    console.log(`Server listnening on http://localhost:${port}`)
})