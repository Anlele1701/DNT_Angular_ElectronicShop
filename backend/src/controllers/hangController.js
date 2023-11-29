var hangService=require('../services/hangService')

var createNewHang=async(req,res)=>{
    var hangItem=await hangService.createHang(req.body);
    res.send(hangItem)
}
var getAllHang=async(req,res)=>{
    var hangList=await hangService.getAllHang();
    res.send(hangList)
}

var getAllHangFromCate=async(req,res)=>{
    var hangList=await hangService.getAllHangFromCate(req.body);
    res.send(hangList)
}
var deleteHang = async(req,res)=>{
    console.log("Đã xóa" + req.params.id);
    var result = await hangService.deleteHang(req.params.id);
    if (result)
    {
        res.send({"status":true, "message":"Xóa thành công"});
    }
    else
    {
        res.send({"status":false, "message":"Xóa thất bại"});
    }
}

var getHang= async(req,res)=>{
    var infoHang=await hangService.getHang(req.params.idHang)
    res.send(infoHang)
}
module.exports={createNewHang,getAllHang,getAllHangFromCate, deleteHang, getHang}