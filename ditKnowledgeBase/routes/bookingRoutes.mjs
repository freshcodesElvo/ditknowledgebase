import express from 'express';
import Booking from '../models/bookingModel.mjs'; // Import your Booking model
import authMiddleware from '../middleware/authMiddleware.mjs'; // Import your auth middleware

const router = express.Router();

// Fetch booked properties for the current user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }); // Fetch bookings for the current user
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching booked properties:', error);
        res.status(500).json({ message: 'An error occurred while fetching booked properties. Please try again later.' });
    }
});

// Booking a property
router.post('/book', authMiddleware, async (req, res) => {
    const { propertyId, userName, userEmail, bookingDate } = req.body;
    console.log('Booking property with details:', { propertyId, userName, userEmail, bookingDate });

    if (!propertyId || !userName || !userEmail || !bookingDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Save the booking to the database
        const newBooking = new Booking({ 
            propertyId, 
            userId: req.user.id, // Include userId from the authenticated user
            userName, 
            userEmail, 
            bookingDate 
        });
        await newBooking.save();

        console.log('New booking:', newBooking);

        res.status(201).json({ message: 'Booking successful!', booking: newBooking });
    } catch (error) {
        console.error('Error booking property:', error);
        res.status(500).json({ message: 'An error occurred while booking. Please try again later.' });
    }
});

export default router;
