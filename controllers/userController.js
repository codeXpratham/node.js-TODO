import { User } from "../models/userModel.js";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendCookies } from "../Utils/features.js";

// export const  getAllUsers =  async (req, res) => {};

export const login = async (req, res , next) => {
    try {
      const {email , password } = req.body;

    const user = await User.findOne({email }).select("+password");

    if(!user) {
      return next(new ErrorHandler("Invalid email or password" , 400 )); 
    } 

   //  if(!user){
   //    return res.status(404).json({
   //        success: false,
   //        message: "Invalid email or password",
   //    })
   //  } 
    
    const isMatch = await bcrypt.compare( password , user.password);   

    if(!isMatch){
      // return res.status(404).json({
      //     success: false,
      //     message: "Invalid email or password",
      // })

      return next(new ErrorHandler("Invalid email or password" , 400 )); 
    } 

    sendCookies(user, res , `Welcome Back ${user.name}` , 200);
    } catch (error) {
      next(error);
    }
};

// export const login = async (req, res, next) => {
//    const { email, password } = req.body;

//    try {
//        const user = await User.findOne({ email }).select("+password");

//        if (!user) {
//            return res.status(404).json({
//                success: false,
//                message: "Invalid email or password",
//            });
//        }

//        const isMatch = await bcrypt.compare(password, user.password);

//        if (!isMatch) {
//            return res.status(404).json({
//                success: false,
//                message: "Invalid email or password",
//            });
//        }

//        sendCookies(user, res, `Welcome Back ${user.name}`, 200);
//    } catch (error) {
//        // Handle any errors
//        console.error(error);
//        return res.status(500).json({
//            success: false,
//            message: "Internal Server Error",
//        });
//    }
// };


export const register = async (req, res, next) => {
     try {
      const {name , email , password} = req.body;
     let user = await User.findOne({name: name, email: email});

   //   if(user){
   //      return res.status(404).json({
   //          success: false,
   //          message: "user already registered"
   //      })
   //   } 
     
     if(user) {
      return next(new ErrorHandler("user already registered" , 400 )); 
    } 
     
     const hasedPassword = await bcrypt.hash(password , 10);

     const user1 = await User.create({name, email , password : hasedPassword});
     
     sendCookies(user1 , res, "Registerd Successfully" , 201);
     } catch (error) {
      next(error);
     }
     
}

export const getMyProfile = (req, res) => {

   res.status(200).json({
      success: true,
      user : req.user,
   });

};
export const logout = (req, res) => {

   res.status(200)
   .cookie("token" , "" , {
      expires: new Date(Date.now()),
      sameSite : process.env.NODE_ENV !== 'Development' ? "lax" : "none",
      secure : process.env.NODE_ENV !== 'Development' ? false :true, 
   } )
   .json({
      success: true,
      user : req.user,
   });


};


