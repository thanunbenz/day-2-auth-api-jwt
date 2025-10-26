const { register, login } = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, register); // Use
router.post('/login', validateLogin, login); // Use

module.exports = router;
