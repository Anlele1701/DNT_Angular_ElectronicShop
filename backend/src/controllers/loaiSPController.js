var loaiSPService=require('../services/loaiSPService')

var createnewLoaiSPtoHang=async(req,res)=>{
    var createNew=await loaiSPService.createnewLoaiSPtoHang(req.body)
    res.send(createNew)
}

var countLoaiSP=async(req,res)=>{
    var sumLoaiSP=await loaiSPService.countLoaiSP()
    res.send(sumLoaiSP)
}

var createLoaiSP=async(req,res)=>{
    var newLoaiSP=await loaiSPService.createLoaiSP(req)
    res.send(newLoaiSP)
}

module.exports={
    createnewLoaiSPtoHang,
    countLoaiSP,
    createLoaiSP
}