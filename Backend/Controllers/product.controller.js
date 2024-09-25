const  {asyncHandler} =require("../Utils/asyncHandler.js")

const ApiResponse =require("../Utils/Apiresponse")
const Apierror =require("../Utils/ApiError")
const fetch =require( 'node-fetch')
const fetchFakeProducts=asyncHandler(async(req,res,next)=>{
    const result = await fetch('https://fakestoreapi.com/products');
    const finaldata=await result.json()
    if(!result)
    {
        throw new Apierror(500,"Error fetching the data form the fake store")
    }

    res.json(
        new ApiResponse(
            200,
            finaldata,
            "fetched products successfully"
        )
    )


})
module.exports={fetchFakeProducts}


