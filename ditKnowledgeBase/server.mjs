import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

import propertyRoutes from './routes/propertyRoutes.mjs';
import articlesRoutes from './routes/articles.mjs';
import dialogflowWebhook from './controllers/dialogflowWebhook.mjs';
import authRoutes from './routes/auth.mjs'; 
import bookingRoutes from './routes/bookingRoutes.mjs'; 
import userRoutes from './routes/users.mjs'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/properties', propertyRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/webhook', dialogflowWebhook);
app.use('/api/auth', authRoutes); 
app.use('/api/bookings', bookingRoutes); 
app.use('/api/users', userRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
