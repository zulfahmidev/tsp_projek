const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()
// require('./utils/DB.js')
process.env = require('./Configs.js').configs;
const router = require('./Router.js').router;

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, 'localhost', () => {
    console.log('Server listen at 127.0.0.1:8080');
})