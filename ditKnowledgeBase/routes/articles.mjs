import express from 'express';
import Article from '../models/articles.mjs';

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search articles by query
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const articles = await Article.find({ content: { $regex: query, $options: 'i' } });
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new article
router.post('/', async (req, res) => {
    const article = new Article(req.body);
    try {
        await article.save();
        res.status(201).json({ message: 'Article created successfully', article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
