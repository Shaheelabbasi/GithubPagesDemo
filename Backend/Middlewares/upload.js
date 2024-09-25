const multer=require('multer')
const path=require("path")
const uploadPath=path.join(__dirname,"../public")
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadPath)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const upload=multer({storage:storage})
module.exports=upload