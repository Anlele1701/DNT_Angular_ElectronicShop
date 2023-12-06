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
module.exports={muaHang, showdonhang}