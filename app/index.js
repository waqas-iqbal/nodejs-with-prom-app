const express = require('express');
const client = require('prom-client');
const app = express();
const PORT = process.env.PORT || 3000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new client.Counter({
    name: 'nodejs_request_total',
    help: 'Total number of requests',
});

app.get('/', (req, res) => {
    requestCounter.inc();
    res.send('Node.js + Prometheus working! Powered by Mr. Rishabh!');
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});