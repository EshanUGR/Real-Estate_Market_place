import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errrHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Return success response without the password
    res
      .status(201)
      .json('User created successfully!');
  } catch (error) {
    next(errrHandler(550,'error from the function '));
  }
};

export const signin=async (req,res,next)=>
{
  const {email,password}=req.body;
  try{
const validUser=await User.findOne({email});

if(!validUser) return next(errorHandler(404,'User not found'));

const validPassword=bcryptjs.compareSync(password,validUser.password);
if(!validPassword) return next(errorHandler(401,'Wrong Credential!s'));

const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
const {password:pass,...rest}=validUser._doc;
res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUser);
  }
  catch(error)
  {
    next(error);
  }
}