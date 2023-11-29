const hangModel = require('../models/hangModel')
var loaiSPModel=require('../models/loaiSPModel')
var hangService=require('../services/hangService')
var sanPhamService=require('../services/sanPhamService')

var listIDSP=[]
var cateID=''

//tìm các sp theo loại sp và hãng của sp
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

//tìm id của loại sp
var findCateID=async(tenLoaiSP)=>{
    try{
        const idLoaiSP=await loaiSPModel.findOne({tenLoai:tenLoaiSP}).then(document=>{
            cateID=document.id
            return idLoaiSP
        })
    }catch(error)
    {
        console.error(error)
    }
}


//thêm loại sản phẩm vào hãng
var createnewLoaiSPtoHang=async(sp)=>{
    try{
        var item=await hangModel.findOne({tenNhaSX:sp.tenHang}).then(async (document)=>{
            document.cacLoaiSP.push(sp.tenLoaiSP)
            document.save()
            var hangItem={idHang:document._id}
            var loaiSP=await loaiSPModel.findOne({tenLoai:sp.tenLoaiSP}).then((document1)=>{
                document1.cacHang.push(hangItem)
                document1.save()
            })
            return document
        })
        return item
        
    }catch(error)
    {
        console.error(error)
    }
}

var countLoaiSP=async()=>{
    try{
        var count=loaiSPModel.find({}).then(document=>{
            var listLoaiSP=[]
            document.forEach(item=>{
                listLoaiSP.push(item.tenLoai)
            })
            console.log(document.length)
            return {sumLoaiSP: document.length, listLoaiSP: listLoaiSP}
        })
        return count
    }catch(error){
        console.log(error)
    }
}

var createLoaiSP=async(req)=>{
    try{
        var newLoaiSP=new loaiSPModel({
            tenLoai:req.body.tenLoai
        })
        newLoaiSP.save().then((document)=>console.log(document))
        return newLoaiSP
    }
    catch(error)
    {
        console.log(error)
    }
}
module.exports={listIDSP,getProductsOfCompany,findCateID,cateID, createnewLoaiSPtoHang, countLoaiSP,createLoaiSP}