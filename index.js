require('dotenv').config();
require('./models/db');

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const port  = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}......`);
})
