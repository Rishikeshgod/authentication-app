const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/user_routes')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const app = express();
require('dotenv').config();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(express.json());

app.use('/api',router)
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.ourztbf.mongodb.net/auth?retryWrites=true&w=majority`).then(()=>{
    app.listen(5000);
    console.log("Database is connected and it is listening in port 5000")
}).catch((err)=>console.log(err));