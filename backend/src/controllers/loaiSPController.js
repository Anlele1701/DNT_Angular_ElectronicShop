var loaiSPService=require('../services/loaiSPService')

var createnewLoaiSPtoHang=async(req,res)=>{
    var createNew=await loaiSPService.createnewLoaiSPtoHang(req.body)
    res.send(createNew)
}

module.exports={
    createnewLoaiSPtoHang
}