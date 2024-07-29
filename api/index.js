// 47.22

import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>
{
  console.log("Connected to MongoDB");
})
.catch((err)=>
{
  console.log(err);
})
const app = express();
let PORT = 3000;


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}!!`);
});
