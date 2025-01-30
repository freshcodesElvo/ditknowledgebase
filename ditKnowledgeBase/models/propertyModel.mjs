import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    bookingDate: { type: Date, required: true },
});


const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    environment: { type: String, required: true },
    petsAllowed: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    bookings: [{ 
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        userEmail: { type: String, required: true },
        bookingDate: { type: Date, required: true },
    }],
});

propertySchema.index({ name: 'text', city: 'text', neighborhood: 'text', description: 'text' });

const Property = mongoose.model('Property', propertySchema);

export default Property;
