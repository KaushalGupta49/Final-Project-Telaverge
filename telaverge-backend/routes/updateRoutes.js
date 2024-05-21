const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const collectionName = 'searchHistory';

router.get('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    let query = {name: req.query.name};
    let items = await collection.findOne(query);
    if (!items) {
      await collection.insertOne(query);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/get', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    let items = await collection.find({}).toArray();
    res.json(items);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
