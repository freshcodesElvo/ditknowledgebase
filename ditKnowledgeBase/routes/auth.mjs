import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';
import dotenv from 'dotenv';
import axios from 'axios'; // Import axios

dotenv.config(); // Load environment variables

const router = express.Router();

async function verifyEmail(email) {
    const url = `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}`;
    try {
        const response = await axios.get(url);
        console.log('Email verification response:', response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error('Error verifying email:', error);
        return null;
    }
}

// User Registration
router.post('/register', async (req, res) => {
    const { firstName, secondName, username, email, password } = req.body;

    try {
        const emailVerification = await verifyEmail(email);
        if (!emailVerification || emailVerification.status !== 'valid') {
            return res.status(400).json({ message: 'Invalid or undeliverable email address' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, secondName, username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user: { id: user._id } }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token); // Add log to trace token
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
    }
});
// Add this route to handle refresh token
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'No refresh token provided.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // Verify the refresh token
        const user = await User.findById(decoded.user.id); // Find the user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const token = jwt.sign({ user: { id: user.id } }, process.env.TOKEN_SECRET, { expiresIn: '1h' }); // Create a new token
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ message: 'An error occurred while refreshing the token. Please try again later.' });
    }
});


export default router;
