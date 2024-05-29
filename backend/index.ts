import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import config from './config';
import usersRouter from "./routers/users";



const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/users', usersRouter);


const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Port: ${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();