var sanPhamModel=require('../models/sanPhamModel')
var loaiSPService=require('../services/loaiSPService')
var listSP=[]
module.exports.getProductOfCompany=async(tenLoai,idHang)=>{
    try{
        loaiSPService.getProductsOfCompany(tenLoai,idHang)
        loaiSPService.listIDSP.forEach(item=>{
            var productItem=sanPhamModel.findById(item).then(document=>{
                listSP.push(document)
            })
        })
        return listSP
    }catch(error)
    {
        console.error(error)
    }
}