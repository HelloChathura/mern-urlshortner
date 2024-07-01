import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import shortUrlRouter from './routes/shorturl.route.js';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import emailRoutes from './routes/email.route.js';
import userRoute from './routes/user.route.js'


mongoose
.connect(process.env.MONGO)
.then(() =>{
    console.log("Connected to MongoDB");
})
.catch((err) =>{
    console.log(err);
});


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});

app.use("/api/shorturl",shortUrlRouter);
app.use('/api/email', emailRoutes);
app.use('/api/user', userRoute);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode ||500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success:false,
      statusCode,
      message  
    })
});

