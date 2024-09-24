
const express=require("express")
const { Login ,SignUp} =require( "../Controllers/auth.controller.js");
const authRouter=express.Router();


authRouter.post("/login",Login)
authRouter.post("/signup",SignUp)



module.exports={authRouter}