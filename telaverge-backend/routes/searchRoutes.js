const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const collectionName = 'products';

router.get('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    let query = {};

    if (req.query.name && req.query.name.trim() !== '') {
      query.name = {$regex: req.query.name, $options: 'i'};
    }

    const items = await collection.find(query).toArray();
    res.json(items);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
