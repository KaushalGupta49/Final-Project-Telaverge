/* jshint esversion: 8 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDatabase = require('./models/db');

const app = express();
app.use('*', cors());
const port = 3060;

connectToDatabase()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((e) => console.error('Failed to connect to DB', e));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const updateRoutes = require('./routes/updateRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/update', updateRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
  res.send('Inside the server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
