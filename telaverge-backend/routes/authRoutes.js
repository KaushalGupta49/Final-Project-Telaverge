const express = require('express');
const connectToDatabase = require('../models/db');
const router = express.Router();

const {body, validationResult} = require('express-validator');
const collectionName = 'users';

router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const existingEmail = await collection.findOne({email: req.body.email});

    if (existingEmail) {
      return res.json({error: 'Email id already exists'});
    }
    const email = req.body.email;
    console.log('email is', email);

    const newUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      searchHistory: '',
    };
    await collection.insertOne(newUser);
    res.json({email});
  } catch (e) {
    return res.send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
  console.log('Login successful');
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const theUser = await collection.findOne({email: req.body.email});
    function comparePassword(p1, p2) {
      if (p1 == p2) {
        return true;
      } else {
        return false;
      }
    }
    if (theUser) {
      let result = comparePassword(req.body.password, theUser.password);
      if (!result) {
        return res.json({error: 'Wrong pasword'});
      }
      const userName = theUser.firstName;
      const userEmail = theUser.email;
      return res.json({userName, userEmail});
    } else {
      return res.json({error: 'User not found'});
    }
  } catch (e) {
    return res.json({error: 'Internal server error'});
  }
});

module.exports = router;
