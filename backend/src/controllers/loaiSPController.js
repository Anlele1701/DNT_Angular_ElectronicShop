var loaiSPService=require('../services/loaiSPService')

var createnewLoaiSPtoHang=async(req,res)=>{
    var createNew=await loaiSPService.createnewLoaiSPtoHang(req.body)
    res.send(createNew)
}

var countLoaiSP=async(req,res)=>{
    var sumLoaiSP=await loaiSPService.countLoaiSP()
    res.send(sumLoaiSP)
}

module.exports={
    createnewLoaiSPtoHang,
    countLoaiSP
}