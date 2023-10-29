var khacHangService=require('../services/khachHangService')

var dangKy=async(req,res)=>{
    var regInformUser=await khacHangService.dangKy(req)
    res.send(regInformUser)
}

var verifyEmail=async(req,res)=>{

    var verify=await khacHangService.verifyEmail(req)
}

module.exports={dangKy,verifyEmail}