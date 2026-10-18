const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));

// routers

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    app.listen(3000, () => console.log('Listening on 3000'));
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');

start();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes);

module.exports = app;
