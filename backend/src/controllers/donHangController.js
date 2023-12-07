var donHangService= require('../services/donHangService')


var muaHang=async(req,res)=>{
    try{
        var result=donHangService.muaHang(req.body.userOrder,req.body.cartList)
        res.send(result)
    }catch(error)
    {
        console.log(error)
    }
}
var showdonhang=async(req,res)=>{
    try{
        var result=await donHangService.showdonhang(req.params.idKH)
        console.log(result)
        res.send(result)
    }
    catch(error)
    {
        console.log(error)
    }
}

var getCTDH=async(req,res)=>{
    try{
        var ctdh=await donHangService.getCTDH(req.params.idKH, req.params.idDH)
        console.log(ctdh)
        res.send(ctdh)
    }catch(error){
        console.log(error)
    }
}


var updateTTDonHang=async(req,res)=>{
    try{
        var update=await donHangService.updateTTDonHang(req.body.infoOrder)
        res.send({noti:update})
    }catch(error)
    {
        console.log(error)
    }
}


var huyDonHang=async(req,res)=>{
    try{
        var update=await donHangService.huyDonHang(req.body.infoOrder)
        res.send({noti:update})
    }
    catch(error)
    {
        console.log(error)
    }
}

var khoiPhucDonHang=async(req,res)=>{
    try{
        var update=await donHangService.khoiPhucDonHang(req.body.infoOrder)
        res.send({noti:update})
    }catch(error)
    {
        console.log(error)
    }
}

module.exports={muaHang,createpayment,getvnPayIPN,vnPayReturn, QLDSDonHang, getCTDH, updateTTDonHang, huyDonHang, khoiPhucDonHang}