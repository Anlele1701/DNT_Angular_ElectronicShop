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

module.exports={muaHang}