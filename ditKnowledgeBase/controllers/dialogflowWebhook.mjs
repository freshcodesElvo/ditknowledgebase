import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import Property from '../models/propertyModel.mjs'; // Assuming you have a property model

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const intentName = req.body.queryResult.intent.displayName;
        const parameters = req.body.queryResult.parameters || {};

        console.log('Received Request:', JSON.stringify(req.body, null, 2));
        console.log('Intent Name:', intentName);
        console.log('Parameters:', parameters);

        // Handle Welcome Intent
        if (intentName === 'Default Welcome Intent') {
            return res.json({
                fulfillmentText: 'Hi there! How can I assist you today? You can ask me to find properties, reserve one, or anything else!'
            });
        }

        // Handle Property Search by Criteria
        if (intentName === 'PropertySearchByCriteria') {
            const bedrooms = parseInt(parameters['numberofbedrooms'], 10);
            const environment = parameters['environment'] ? parameters['environment'].toLowerCase() : null;

            console.log(`Searching for properties with ${bedrooms} bedrooms and environment: ${environment}`);

            // Validate parameters
            if (!bedrooms || !environment) {
                const missingParams = [];
                if (!bedrooms) missingParams.push("number of bedrooms");
                if (!environment) missingParams.push("environment");

                return res.json({
                    fulfillmentText: `Please provide both the ${missingParams.join(" and ")}. For example, you could say "Find a house with 3 bedrooms in a quiet area."`
                });
            }

            try {
                const query = {
                    bedrooms: bedrooms,
                    environment: { $regex: new RegExp(environment, 'i') }
                };

                console.log('Query being sent to the database:', query);

                const properties = await Property.find(query).select('name bedrooms environment petsAllowed price image');

                if (properties.length > 0) {
                    const propertyList = properties.map(property => (
                        `<div>
                            <strong>${property.name}</strong><br>
                            Bedrooms: ${property.bedrooms}<br>
                            Environment: ${property.environment}<br>
                            Pets Allowed: ${property.petsAllowed ? 'Yes' : 'No'}<br>
                            Price: $${property.price}<br>
                            <img src="${property.image}" alt="${property.name}" style="width:200px;height:auto;"><br>
                            <button onclick="bookProperty('${property._id}', '${property.name}')">Book</button>
                        </div>`
                    ));

                    return res.json({
                        fulfillmentText: `Here are the properties I found for you:\n\n${propertyList.join('\n')}`
                    });
                } else {
                    return res.json({
                        fulfillmentText: 'Sorry, no properties found matching your criteria. Let me suggest some other options for you.'
                    });
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                return res.status(500).json({
                    fulfillmentText: 'Sorry, I couldn’t retrieve the information right now. Please try again later.'
                });
            }
        }

        // Handle Property Booking
        if (intentName === 'BookProperty') {
            const propertyId = parameters['propertyId'];
            const userName = parameters['userName'];

            if (!propertyId || !userName) {
                return res.json({
                    fulfillmentText: 'Please provide both the property ID and your name to book a property.'
                });
            }

            try {
                const property = await Property.findById(propertyId);

                if (!property) {
                    return res.json({
                        fulfillmentText: 'Sorry, I couldn’t find the property you’re trying to book. Please try again.'
                    });
                }

                console.log(`Booking confirmed for property: ${property.name}, by user: ${userName}`);

                return res.json({
                    fulfillmentText: `Thank you, ${userName}! You have successfully booked the property "${property.name}". The price is $${property.price}.`
                });
            } catch (error) {
                console.error('Error handling booking:', error);
                return res.status(500).json({
                    fulfillmentText: 'There was an error processing your booking. Please try again later.'
                });
            }
        }

        // Handle Unrecognized Intents with Random Property Suggestions
        console.log('Unrecognized Intent:', intentName);

        try {
            const randomProperties = await Property.aggregate([
                { $sample: { size: 3 } },
                { $project: { name: 1, bedrooms: 1, environment: 1, petsAllowed: 1, price: 1, image: 1 } }
            ]);

            if (randomProperties.length > 0) {
                const randomPropertyList = randomProperties.map(property => (
                    `<div>
                        <strong>${property.name}</strong><br>
                        Bedrooms: ${property.bedrooms}<br>
                        Environment: ${property.environment}<br>
                        Pets Allowed: ${property.petsAllowed ? 'Yes' : 'No'}<br>
                        Price: Ksh ${property.price}<br>
                        <img src="${property.image}" alt="${property.name}" style="width:200px;height:auto;"><br>
                        <button onclick="bookProperty('${property._id}', '${property.name}')">Book</button>
                    </div>`
                ));

                return res.json({
                    fulfillmentText: `I couldn’t quite get that, but here are some properties you might be interested in:\n\n${randomPropertyList.join('\n')}`
                });
            } else {
                return res.json({
                    fulfillmentText: 'I’m not sure how to help with that, but here are some random property suggestions!'
                });
            }
        } catch (error) {
            console.error('Error fetching random properties:', error);
            return res.status(500).json({
                fulfillmentText: 'I couldn’t retrieve properties right now. Please try again later.'
            });
        }
    } catch (error) {
        console.error('Error handling webhook request:', error);
        return res.status(500).json({
            fulfillmentText: 'Internal server error. Please try again later.'
        });
    }
});

export default router;
