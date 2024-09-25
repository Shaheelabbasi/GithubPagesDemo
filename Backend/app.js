const express = require('express');
const {authRouter} = require('./Routes/auth.router.js');  // No destructuring, as it's the default export
const {productRouter}=require("./Routes/product.router.js")
const {FileRouter}=require("./Routes/file.router.js")
const app = express();

app.use(express.json());
// app.use(Cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routers
app.use('/auth', authRouter);
app.use('/check', productRouter);
app.use('/check', FileRouter);

module.exports = app;
