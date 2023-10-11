var hangService=require('../services/hangService')

var createNewHang=async(req,res)=>{
    var hangItem=await hangService.createHang(req.params.tenHang);
    res.send(hangItem)
}

module.exports={createNewHang}