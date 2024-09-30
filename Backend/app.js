const express = require('express');
const { authRouter } = require('./Routes/auth.router.js');
const { productRouter } = require('./Routes/product.router.js');
const { FileRouter } = require('./Routes/file.router.js');
const client = require('prom-client');
const path=require("path")
const app = express();
const cors=require("cors")

app.use(cors(
   {
    origin:'*',
    methods:["GET","POST","PUT","DELETE"]
   }
))
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
app.use("/Public",express.static(path.join(__dirname,'Public')));

// Routers
app.use('/auth', authRouter);
app.use('/mart', productRouter);


module.exports = app;
