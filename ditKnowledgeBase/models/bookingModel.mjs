// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema({
//     propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
//     userId: { type: String, required: true },
//     userName: { type: String, required: true },
//     userEmail: { type: String, required: true },
//     bookingDate: { type: Date, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// export default Booking;


import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    propertyId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

