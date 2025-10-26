const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());
const PORT = process.env.PORT || 3000;

const auth = require('./routers/auth');
const protected = require('./routers/protected');

app.use('/api/auth', auth);
app.use('/api/protected', protected);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});