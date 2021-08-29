// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
const SERVER_URL = `http://${HOST}:${PORT}`;
// PRODUCTION BUILD
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));

app.listen(PORT, () => {
    console.log(`✅  API Server started: ${SERVER_URL}`)
});
