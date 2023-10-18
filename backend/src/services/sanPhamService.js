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
var getProductOfCompany=async(tenLoai,idHang)=>{
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
var createNewCateProduct=async(loaiSP)=>{
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
var createNewProduct=async(product)=>{
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

var getAllProduct=async(nameProductCate)=>{
    var list=[]
    try{
    var productList=await loaiSPModel.findOne({tenLoai:nameProductCate}).then(async document=>{
        document.cacHang.forEach(itemHang=>{
            itemHang.idCacSP.forEach(itemID=>{
                console.log(itemID)
                list.push(getProductFromID(itemID))
            })
        })
        const products = await Promise.all(list);
        console.log(products)
        return products
    })
    return productList
    }
    catch(error)
    {
        console.log(error)
    }
}

var getProductFromID=async(idProduct)=>{
    try{
    var product=await sanPhamModel.findById(idProduct).then(document=>{
        return document
    })
    return product
    }
    catch(error){
        console.log(error)
    }
}

module.exports={listSP,getAllProduct,getProductFromID,getProductOfCompany,createNewCateProduct,createNewProduct}