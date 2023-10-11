const hangModel = require('../models/hangModel')
var loaiSPModel=require('../models/loaiSPModel')
var hangService=require('../services/hangService')


var listIDSP=[]
var cateID=''
var getProductsOfCompany=async(tenLoaiSP, idHang)=>{
    try{
        
        var listItem=await loaiSPModel.findOne({tenLoai:tenLoaiSP}).then(document=>{
            var itemHang=document.cacHang.forEach(element => {
                if(element.idHang===idHang)
                {
                    listIDSP=element.idCacSP
                }
            });
        })
        return listIDSP
    }
    catch(error){
        console.error(error)
    }
}

var findCateID=async(tenLoaiSP)=>{
    try{
        const idLoaiSP=loaiSPModel.findOne({tenLoai:tenLoaiSP}).then(document=>{
            cateID=document.id
        })
    }catch(error)
    {
        console.error(error)
    }
}

var createnewLoaiSPtoHang=async(sp)=>{
    try{
        var idHang=await hangService.createHang('sam sung')
        console.log(idHang)
        var item=hangModel.findById(idHang).then((document)=>{
            document.cacLoaiSP.push(sp.tenSP)
            document.save()
            return document
        })
        return item
        
    }catch(error)
    {
        console.error(error)
    }
}
module.exports={listIDSP,getProductsOfCompany,findCateID,cateID, createnewLoaiSPtoHang}