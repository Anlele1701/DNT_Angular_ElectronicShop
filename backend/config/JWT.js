const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')


const loginRequired=async(req,res,next)=>{
    const token=req.cookies["access-token"]
    if(token){
        const validation=await jwt.verify(token,"secretkey")
        if(validation)
        {
            res.user=validation.id
            next()
        }
        else{
        console.log("token expired")
        }
    }
    else{
        console.log("token not found")
    }
}

module.exports={loginRequired}