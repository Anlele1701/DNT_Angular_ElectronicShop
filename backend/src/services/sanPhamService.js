var sanPhamModel=require('../models/sanPhamModel')
var loaiSPModel=require('../models/loaiSPModel')
var loaiSPService=require('../services/loaiSPService')
const { error } = require('console')
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

module.exports.createNewProduct=async(tenLoai)=>{
    try{
        loaiSPService.findCateID(tenLoai)
        const cateID=loaiSPService.cateID
        console.log(cateID)
        var cateItem=await loaiSPModel.findById(cateID).then((document)=>{
            if(document)
            {
                
            }
            else
            {
                var loaiSPitem=new loaiSPModel({
                    tenLoai:tenLoai,
                    cacHang:[{
                        idHang:'',
                        idCacSP:[]
                    }]
                })
                loaiSPitem.save().then(()=>console.log(loaiSPitem))
            }
        })
    }catch(error)
    {
        console.error(error)
    }
}