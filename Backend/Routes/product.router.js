
const express=require("express")
const {fetchFakeProducts}=require("../Controllers/product.controller.js")
const productRouter=express.Router();


productRouter.get("/getproducts",fetchFakeProducts)




module.exports={productRouter}