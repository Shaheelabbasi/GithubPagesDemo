import express from 'express'

const userRouter=express.Router()
import { addTocart,HandlePayment,removeFromCart,searchProducts} from '../Controllers/user.controller.js'
import VerifyJwt from '../Middlewares/auth.middleware.js'


userRouter.post("/addtocart",VerifyJwt,addTocart)
userRouter.delete("/removeFromcart",VerifyJwt,removeFromCart)
userRouter.post("/payment",VerifyJwt,HandlePayment)
userRouter.get("/searchproducts",VerifyJwt,searchProducts)



export{userRouter}