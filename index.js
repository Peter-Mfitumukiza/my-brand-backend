import dotenv from 'dotenv';
import './utils/db.js';
import userRoutes from './routes/routesUser.js';
import messageRoutes from './routes/routesMessage.js';
import articleRoutes from './routes/routesArticle.js';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
// Setting up swagger
import swaggerDocument from './swagger.json' assert {type: "json"};
import { serve, setup } from 'swagger-ui-express';


dotenv.config();
const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use("/docs", serve, setup(swaggerDocument));
app.use(userRoutes);
app.use(messageRoutes);
app.use(articleRoutes);

const port  = process.env.PORT || 4000;

const server = app.listen(port, ()=>{
    console.log(`Server running on port ${port}......`);
})

export default server;