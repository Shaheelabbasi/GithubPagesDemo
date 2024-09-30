const  {asyncHandler} =require("../Utils/asyncHandler.js")

const Apierror =require("../Utils/ApiError")

const VerifyAdmin=asyncHandler(async(req,res,next)=>{

    if(req.user.role == "admin")
    {
   return next()
    }

    throw new Apierror(401,"Unaurthorzed request You are not admin")


})

module.exports= {
    VerifyAdmin
}
