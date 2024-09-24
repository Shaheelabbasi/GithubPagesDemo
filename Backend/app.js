const express = require('express');
const {authRouter} = require('./Routes/auth.router.js');  // No destructuring, as it's the default export

const app = express();

app.use(express.json());
// app.use(Cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routers
app.use('/MartX/auth', authRouter);

module.exports = app;
