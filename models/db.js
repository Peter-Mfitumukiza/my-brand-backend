import {config} from 'dotenv';
config({path: './.env'});
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_CONN_STRING)
    .then(()=>{
        console.log("DB connected succcesfully....");
    }, err =>{
        console.log("something went wrong...", err);
    })