require('dotenv').config();
require('./models/db');
const express = require('express');
const routes = require('./routes');
// Setting up swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"My brand backend API",
            description: "This is a backend api for my portifolio",
            contact:{
                name: "Peter"
            },
            servers:["http://localhost:3000"]
        }
    },
    apis: ["routes.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

const port  = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}......`);
})