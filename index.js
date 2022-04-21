import dotenv from 'dotenv';
import './utils/db.js';
import routes from './routes.js';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
// Setting up swagger
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
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
dotenv.config();
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use("/docs", serve, setup(swaggerDocs));
app.use(routes);

const port  = process.env.PORT || 4000;

const server = app.listen(port, ()=>{
    console.log(`Server running on port ${port}......`);
})

export default server;