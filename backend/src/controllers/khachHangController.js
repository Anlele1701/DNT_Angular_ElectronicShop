const khachHangModel = require('../models/khachHangModel')
var khacHangService=require('../services/khachHangService')

var dangKy=async(req,res)=>{
    var regInformUser=await khacHangService.dangKy(req)
    if(regInformUser==='Email existed!')
    {
        res.send({emailExisted:regInformUser})
    }
    else res.send(regInformUser)
}

var dangNhap=async(req,res)=>{
    var logInformUser=await khacHangService.dangNhap(req)
    if(logInformUser==="Invalid password!")
    {
        res.send({invalid:logInformUser})
        console.log()
    }
    else
    {
        console.log({token:logInformUser})
        res.send(logInformUser)
    }
}

var verifyEmail=async(req,res)=>{

    var verify=await khacHangService.verifyEmail(req)
}
var countKH = async(req,res)=>{
    try{
    var result = await khacHangService.countKH()
    if (result){
        res.send({result});
    }
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports={dangKy,verifyEmail, dangNhap, countKH}