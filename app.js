import express from 'express';
import mongoose from 'mongoose';
import {connectDB}from './data/database.js'
import userRouter from './routes/userRoute.js'
import taskRouter from './routes/taskRoute.js'
import cors from 'cors'

import {config} from 'dotenv'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';

config({
    path : "./data/config.env"
});


export const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin : [process.env.FRONTEND_URL],
        methods : ['GET', 'POST' , 'PUT' , 'DELETE'],
        credentials : true,
    }
));

app.use( "/api/v1/users", userRouter);
app.use( "/api/v1/task", taskRouter);


app.get('/', (req, res) => {
    res.send("Home");
});
 

app.use(errorMiddleware);
