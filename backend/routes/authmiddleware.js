import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const verifyToken=(req,res,next)=>{
  const usertoken = req.header('Tokenheaders')  //req for token 
  if(!usertoken){
      return res.status(400).send({error: "token not found "})// it will send error message if tkn not found
  }
  
 try {
  const decoded = jwt.verify(usertoken, process.env.JWT_STRING)
  req.id =decoded.id

 } catch (err) {
  if (err instanceof jwt.TokenExpiredError) {
      // JWT token is expireds
      return res.status(401).send({error: "token Expired "})
    } else {
      // Other JWT errors
      console.log('JWT error:', err.message);
    }
  
 }
 next()
}