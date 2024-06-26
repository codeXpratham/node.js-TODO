import jwt from "jsonwebtoken";

export const sendCookies = (user , res, message , statusCode = 200) => {
    const token = jwt.sign({_id : user._id,} , process.env.JWT_SECRET);
    console.log(process.env.NODE_ENV);

     res.status(statusCode).cookie("token" , token , {
        httpOnly: true, 
        maxage : 1000 * 60 * 15, 
        /*sameSite : process.env.NODE_ENV !== 'Development' ? "lax" : "none",*/
        sameSite : "none",
        /*secure : process.env.NODE_ENV !== 'Development' ? false :true, */
         secure : true, 

     }).json({
        success: true,
        message: message,
     })
}
