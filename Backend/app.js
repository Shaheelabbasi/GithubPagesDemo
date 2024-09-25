const express = require('express');
const { authRouter } = require('./Routes/auth.router.js');
const { productRouter } = require('./Routes/product.router.js');
const { FileRouter } = require('./Routes/file.router.js');
const client = require('prom-client');

const app = express();

// Set up Prometheus metrics collection
const register = new client.Registry();

// Track total number of HTTP requests
const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});

// Track response duration
const httpResponseDuration = new client.Histogram({
    name: 'http_response_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status'],
});

// Register the custom metrics
register.registerMetric(httpRequestCounter);
register.registerMetric(httpResponseDuration);

// Collect default metrics (e.g., memory usage, process info)
client.collectDefaultMetrics({ register });

// Middleware to track response time and status
app.use((req, res, next) => {
    const end = httpResponseDuration.startTimer({ method: req.method, route: req.path });

    res.on('finish', () => {
        httpRequestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
        end({ status: res.statusCode });  // Record duration and status
    });

    next();
});

// Expose /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routers
app.use('/auth', authRouter);
app.use('/check', productRouter);
app.use('/check', FileRouter);

module.exports = app;
