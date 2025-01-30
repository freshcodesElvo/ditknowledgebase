import express from 'express';
import User from '../models/userModel.mjs'; 
import Activity from '../models/activityModel.mjs'; 
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Route to get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find({});
        res.status(200).json(properties);
    } catch (error) {
            console.error('Error fetching properties:', error);
            res.status(500).json({ message: 'An error occurred while fetching properties. Please try again later.' });
        }
    });

// Route to get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'An error occurred while fetching user profile. Please try again later.' });
    }
});

// Route to get recent activities
router.get('/recent-activities', authMiddleware, async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.id }).sort({ date: -1 }).limit(10);
        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching recent activities:', error);
        res.status(500).json({ message: 'An error occurred while fetching recent activities. Please try again later.' });
    }
});

export default router;
