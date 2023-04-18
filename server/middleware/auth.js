const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config()

const isAuthenticated=async (req,res,next)=>{
    const  token= req.headers.authorization;
    if(!token){
        return res.status(401).send({
            success: false,
            msg: "Please login to access",
        })
    }
    const decoded=jwt.verify(token,process.env.sec);
    req.user=await UserModel.findById(decoded.id);
    next()
}

module.exports={
    isAuthenticated
}