import express from 'express';
import Property from '../models/propertyModel.mjs';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, city, neighborhood, price, description, imageUrl } = req.body;

    try {
        const newProperty = new Property({ name, city, neighborhood, price, description, imageUrl });
        await newProperty.save();
        res.status(201).json({ message: 'Property added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding property', error });
    }
});

export default router;
