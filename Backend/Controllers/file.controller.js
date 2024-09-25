const  {asyncHandler} =require("../Utils/asyncHandler.js")

const ApiResponse =require("../Utils/Apiresponse")
const Apierror =require("../Utils/ApiError")
const fetch =require( 'node-fetch')
const afterUpload=asyncHandler(async(req,res,next)=>{
    
    res.json(
        new ApiResponse(
            200,
            "file uploaded successfully"
        )
    )


})
module.exports={afterUpload}


