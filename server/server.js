const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

 
app.use(cors())

// Use body-parser middleware to parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const Route = require('./Router/apiRouter');
app.use('/api', Route);

const DbConnetion=require('./Database/dbConnection')
// Start the server
const port = process.env.PORT || 12345;
app.listen(port, () => {
  console.log(`server running port : http://localhost:${port}`);
});
