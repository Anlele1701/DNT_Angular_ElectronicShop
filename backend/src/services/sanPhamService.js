const multer=require('multer')
var hangService=require('../services/hangService')
var sanPhamModel=require('../models/sanPhamModel')
var loaiSPModel=require('../models/loaiSPModel')
var loaiSPService=require('../services/loaiSPService')
const { error } = require('console')
const hangModel = require('../models/hangModel')
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
        tenSP:product.body.product.tenSP,
        moTa:[],
        hinhAnh:[],
        thongSo:product.body.product.thongSo,
        soLuong:product.body.product.soLuong,
        giaTien:product.body.product.giaTien
    })
    product.body.product.hinhAnh.forEach(item=>{
        console.log(item.name)
        var image={
            tenImageSP: item.name,
            dataImageSP: item.size,
            contentTypeSP:item.type
        }
        productItem.hinhAnh.push(image)
    })
    productItem.save().then(()=>console.log("Save product success"))
    var id=productItem._id
    console.log(product.body.tenHang)
    var hangid=await hangService.findIDHang(product.body.tenHang)
    console.log(hangid)
    var loaiSP=await loaiSPModel.findOne({tenLoai:product.body.tenLoaiSP}).then(document=>{
        document.cacHang.forEach(itemHang=>{
            if(itemHang.idHang==hangid){
                itemHang.idCacSP.push(id)
            }
        })
        document.save()
    })
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