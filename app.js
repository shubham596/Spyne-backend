const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const errorMiddleware=require("./middleware/error");
const userRoutes = require('./routes/userRoute');

const connectDB = require('./config/db');
const cookieParser = require("cookie-parser");
const path = require("path");



const app = express();
app.use(express.json());
app.use(cookieParser())
// Middleware

app.use(cors());
app.use(bodyParser.json());
// Routes

app.use('/api/v1/auth', userRoutes);

app.get('/',(req,res)=>{
    res.send("Server is working")
})


process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
})


// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(errorMiddleware);
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})