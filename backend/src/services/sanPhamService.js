const multer=require('multer')

var sanPhamModel=require('../models/sanPhamModel')
var loaiSPModel=require('../models/loaiSPModel')
var loaiSPService=require('../services/loaiSPService')
const { error } = require('console')
var listSP=[]

const Storage=multer.diskStorage({
    destination:'../ProductImages',
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload=multer({
    storage:Storage
})

//lấy tất cả sp theo hãng và loại sp đó
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


//tạo loại sp mới (auto trong collection LOAISP tạo sau khi tạo hãng mới)
module.exports.createNewCateProduct=async(loaiSP)=>{
    try{
        var cate
        const idLoaiSP=await loaiSPModel.findOne({tenLoai:loaiSP.tenloaiSP}).then(document=>{
            cate=document
        })
        if(cate==null)
        {
            var loaiSPitem=new loaiSPModel({
                tenLoai:loaiSP.tenloaiSP,
                cacHang:[]
            })
            var obj={
                idHang:loaiSP.idHang,
                idCacSP:[]
            }
            loaiSPitem.cacHang.push(obj)
            loaiSPitem.save().then(()=>console.log(loaiSPitem))
        }
        else{
            var obj={
                idHang:loaiSP.idHang,
                idCacSP:[]
            }
            cate.cacHang.push(obj)
            cate.save().then(()=>console.log(cate))
        }
        
    }catch(error)
    {
        console.error(error)
    }
}

//tạo sản phẩm mới
module.exports.createNewProduct=async(product)=>{
    var productItem=new sanPhamModel({
        tenSP:product.body.tenSP,
        hinhAnh:[],
        thongSo:{
            hi:'123',
            ba:'234'
        }
    })
    product.files.forEach(item=>{
        var image={
            tenImageSP: item.originalname,
            dataImageSP: item.filename,
            contentTypeSP:"image/png"
        }
        productItem.hinhAnh.push(image)
    })
    productItem.save().then(()=>console.log('success'))
    return (productItem)
}