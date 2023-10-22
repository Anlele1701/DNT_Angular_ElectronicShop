var hangService=require('../services/hangService')

var createNewHang=async(req,res)=>{
    var hangItem=await hangService.createHang(req.body);
    res.send(hangItem)
}
var getAllHang=async(req,res)=>{
    var hangList=await hangService.getAllHang();
    res.send(hangList)
}
module.exports={createNewHang,getAllHang}