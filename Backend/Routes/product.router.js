
const express=require("express")
const {fetchAllProducts,getCategories,getProductsByCategory}=require("../Controllers/product.controller.js")
const productRouter=express.Router();


productRouter.get("/getallproducts",fetchAllProducts)
productRouter.get("/getallcategories",getCategories)
productRouter.get("/getproductsbycategory",getProductsByCategory)

// productRouter.post("/insertproduct",fetchFakeProducts)
// productRouter.post("/insertmanyproducts",addProducts)




module.exports={productRouter}