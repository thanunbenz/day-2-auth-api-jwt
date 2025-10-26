const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { registerSchema , loginSchema , validateRegister} = require('../middleware/validation');

//auth register
const register = async (req, res) => {

    const { email, username, password, confirm_password } = req.body;
    try {

        if (!email || !username || !password || !confirm_password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!/^[a-zA-Z0-9_]{6,30}$/.test(username)) {
            return res.status(400).json({ message: 'Invalid username format' });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const password_hash = await bcrypt.hash(password, 12);

        const newUser = await pool.query(
            'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username',
            [email, username, password_hash]
        );

        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {
    // Login logic here
    const { username, password } = req.body;
    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token here
        const token = jwt.sign(
            {
                id: user.rows[0].id,
                username: user.rows[0].username,
                role: user.rows[0].role,
                is_active: user.rows[0].is_active
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    register,
    login
};