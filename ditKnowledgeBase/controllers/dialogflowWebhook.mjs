import fetch from 'node-fetch';
import express from 'express';
import Property from '../models/propertyModel.mjs'; // Import the Property model

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const intentName = req.body.queryResult.intent.displayName;
        const queryText = req.body.queryResult.queryText;

        console.log('Intent Name:', intentName);
        console.log('Query Text:', queryText);

        if (intentName === 'GetPropertyInfo') {
            console.log('Searching properties for query:', queryText);
            try {
                const properties = await Property.find({ $text: { $search: queryText } });
                console.log('Property Search Response:', properties); // Log the response
                if (properties.length > 0) {
                    const property = properties[0];
                    const fulfillmentText = property ? `${property.name} is located in ${property.neighborhood}, ${property.city}. Price: $${property.price}. Description: ${property.description}` : 'Sorry, I couldn’t find the property you’re looking for.';
                    const responsePayload = {
                        fulfillmentText: fulfillmentText,
                        imageUrl: property.imageUrl // Include imageUrl in the response
                    };
                    res.json(responsePayload);
                } else {
                    res.json({ fulfillmentText: 'Sorry, no properties found.' });
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                res.status(500).json({ fulfillmentText: 'Sorry, I couldn’t retrieve the information right now. Please try again later.' });
            }
        } else if (intentName === 'Default Welcome Intent') {
            // Respond to greetings
            res.json({ fulfillmentText: 'Greetings! How can I assist you today?' });
        } else {
            res.json({ fulfillmentText: 'Sorry, I couldn’t understand that.' });
        }
    } catch (error) {
        console.error('Error handling webhook request:', error);
        res.status(500).json({ fulfillmentText: 'Internal server error.' });
    }
});

export default router;
