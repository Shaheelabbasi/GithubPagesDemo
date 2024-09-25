const express = require('express');
const { authRouter } = require('./Routes/auth.router.js');  // No destructuring, as it's the default export
const { productRouter } = require('./Routes/product.router.js');
const { FileRouter } = require('./Routes/file.router.js');
const client = require('prom-client');

const app = express();

// Set up Prometheus metrics collection
const register = new client.Registry();

// Collect default metrics (e.g., memory usage, process info)
client.collectDefaultMetrics({ register });

// Expose /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.use(express.json());
// app.use(Cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routers
app.use('/auth', authRouter);
app.use('/check', productRouter);
app.use('/check', FileRouter);

module.exports = app;
