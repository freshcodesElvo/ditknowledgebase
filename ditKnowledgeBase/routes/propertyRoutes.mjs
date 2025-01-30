import express from 'express';
import Booking from '../models/bookingModel.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';
import Property from '../models/propertyModel.mjs'; // Correctly import the Property model

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


// Route to add a new property
router.post('/add', async (req, res) => {
    const { name, city, neighborhood, price, description, imageUrl, bedrooms, environment, petsAllowed } = req.body;

    if (!name || !city || !neighborhood || !price || !description || !imageUrl || !bedrooms || !environment || petsAllowed === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newProperty = new Property({ name, city, neighborhood, price, description, imageUrl, bedrooms, environment, petsAllowed });
        await newProperty.save();

        res.status(201).json({ message: 'Property added successfully!', property: newProperty });
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ message: 'An error occurred while adding the property. Please try again later.' });
    }
});
// Route to search properties based on criteria
router.get('/search', async (req, res) => {
    const { bedrooms, environment, petsAllowed } = req.query;
    const query = {};

    // Add criteria to the query if they exist
    if (bedrooms) {
        query.bedrooms = bedrooms;
    }
    if (environment) {
        query.environment = new RegExp(environment, 'i'); // Case-insensitive match
    }
    if (petsAllowed) {
        query.petsAllowed = petsAllowed === 'true';
    }

    try {
        const properties = await Property.find(query);
        res.status(200).json({ properties });
    } catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).json({ message: 'An error occurred while searching for properties. Please try again later.' });
    }
});

// Protected route - Booking a property
router.post('/book', authMiddleware, async (req, res) => {
    const { propertyId, userName, userEmail, bookingDate } = req.body;
    console.log('Booking property with details:', { propertyId, userName, userEmail, bookingDate });

    if (!propertyId || !userName || !userEmail || !bookingDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        // Save the booking to the database
        const newBooking = new Booking({ propertyId, userId: req.user.id, userName, userEmail, bookingDate });
        await newBooking.save();

        console.log('New booking:', newBooking);

        res.status(201).json({ message: 'Booking successful!', booking: newBooking });
    } catch (error) {
        console.error('Error booking property:', error);
        res.status(500).json({ message: 'An error occurred while booking. Please try again later.' });
    }
});

export default router;
