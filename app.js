const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

// routers
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes);

module.exports = app;
