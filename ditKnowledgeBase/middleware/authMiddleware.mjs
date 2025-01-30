import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export default async function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    console.log('Authorization Header:', token); // Add log to trace header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
        console.log('Decoded Token:', decoded); // Add log to trace decoded token
        req.user = { id: decoded.user.id };
        next();
    } catch (error) {
        console.error('Middleware error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
}
