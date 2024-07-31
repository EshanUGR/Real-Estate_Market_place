// 1.20

import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js'
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

app.use(express.json());
let PORT = 3000;


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}!!`);
});


app.get('/test',(req,res)=>
{
 res.json({
  message:'Hello World!'
 });
})


app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


