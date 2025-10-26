const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/jwt');

router.get('/profile', verifyToken, (req, res) => {
    res.send(`Welcome to your profile, ${req.user.username}`);
});

router.get('/admin', verifyToken, requireRole("admin"), (req, res) => {
    res.send(`Welcome to your profile, ${req.user.username}`);
});


module.exports = router;
