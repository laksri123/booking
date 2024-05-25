import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
// import { startSession } from "mongoose";
export const register = async (req,res,next) => {
    try{
        const{username,email,password} = req.body
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hash,
        })

        await newUser.save();
        res.status(200).send("user has been created");

    }
    catch(err){
        next(err);
    }

}
export const login = async (req,res,next) => {
    try{
        
        const user =  await User.findOne({username: req.body.username})
        if(!user) return  next(createError(404, "user not found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));  

      const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET );
    
      const{ password, isAdmin, ...otherDetails} = user._doc;

    
       res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({...otherDetails});
        } 
    
    catch(err){
        next(err);
    }

}