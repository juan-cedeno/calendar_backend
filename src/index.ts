import "reflect-metadata";
import {createConnection} from "typeorm";
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import authRouter from "./routers/auth/auth.router";
import cors from 'cors'


createConnection().then(async connection => {
    console.log('connected');
    
}).catch(error => console.log(error));

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth' , authRouter)


app.listen(process.env.PORT ,() => {
    console.log(process.env.PORT);
})