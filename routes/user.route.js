const express =  require("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
//  Regestation => 

UserRouter.post("/regiter",(req,res)=>{
    const {username,email,password} =  req.body;
    try {
        bcrypt.hash(password,5 , async(err,hash)=>{
         if(err){
            res.status(200).json({msg:"Here some Internal Error occuring"})
         }else{
            const user = new UserModel({
                 username:username,
                 email:email,
                 password:hash
            })
            await user.save();
            res.status(200).json({msg:"You are regiterd Now Login Please"})
         }
        })
    } catch (error) {
        res.status(400).json({msg:"Internal Error"})
    }
})



//  Login Route 

UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email:email});
         if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token  = jwt.sign({userID:user._id,username:user.username},"yogesh")
                    res.status(200).json({msg:"You are Logged In",token})
                }
            })
         }
     
    } catch (error) {
        res.status(400).json({msg:"here some internal Error is Ocurring"})
    }
})



module.exports = {
    UserRouter
}