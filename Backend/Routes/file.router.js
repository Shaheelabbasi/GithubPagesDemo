
const express=require("express")
const {afterUpload}=require("../Controllers/file.controller.js")
const FileRouter=express.Router();
const upload=require('../Middlewares/upload.js')

// use name=myfile to test the file upload
FileRouter.post("/uploadfile",upload.single('myfile'),afterUpload)




module.exports={FileRouter}