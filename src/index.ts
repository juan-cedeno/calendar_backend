import "reflect-metadata";
import {createConnection} from "typeorm";
// import dotenv from 'dotenv'
// dotenv.config()
require('dotenv').config()
import express from 'express'
import authRouter from "./routers/auth/auth.router";
import cors from 'cors'
import eventRouter from "./routers/event/event.router";


createConnection().then(async connection => {
    console.log('connected');
    
}).catch(error => console.log(error));

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth' , authRouter)
app.use('/api/event' , eventRouter)


app.listen(process.env.PORT || 5000 ,() => {
    console.log(process.env.PORT);
})
