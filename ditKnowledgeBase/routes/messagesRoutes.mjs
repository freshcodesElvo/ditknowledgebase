import express from 'express';
import Message from '../models/messageModel.mjs'; // Import your Message model
import authMiddleware from '../middleware/authMiddleware.mjs'; // Import your auth middleware

const router = express.Router();

// Fetch messages for the current user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ userId: req.user.id }).sort({ date: -1 }); // Fetch messages for the current user
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'An error occurred while fetching messages. Please try again later.' });
    }
});

// Send a new message
router.post('/send', authMiddleware, async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Message content is required.' });
    }

    try {
        const newMessage = new Message({
            userId: req.user.id,
            content,
            date: new Date(),
        });
        await newMessage.save();

        console.log('New message:', newMessage);

        res.status(201).json({ message: 'Message sent successfully!', message: newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'An error occurred while sending the message. Please try again later.' });
    }
});

export default router;
