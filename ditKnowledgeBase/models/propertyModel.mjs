import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Add imageUrl field
    createdAt: { type: Date, default: Date.now }
});

// Create a text index on the fields you want to search
propertySchema.index({ name: 'text', city: 'text', neighborhood: 'text', description: 'text' });

const Property = mongoose.model('Property', propertySchema);

export default Property;
