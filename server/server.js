/* server/server.js */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');

app.get('/api/host', (req, res) => {
    res.send({ host : 'admin' });
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})