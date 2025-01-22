import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import propertyRoutes from './routes/propertyRoutes.mjs';
import articlesRoutes from './routes/articles.mjs';
import dialogflowWebhook from './controllers/dialogflowWebhook.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/webhook', dialogflowWebhook);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
