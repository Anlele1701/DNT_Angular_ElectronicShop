const multer=require('multer')
var hangService=require('../services/hangService')
var sanPhamModel=require('../models/sanPhamModel')
var loaiSPModel=require('../models/loaiSPModel')
var loaiSPService=require('../services/loaiSPService')
const { error } = require('console')
const hangModel = require('../models/hangModel')
var listSP=[]


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
var createNewProduct=async(product,tenLoaiSP,tenHang)=>{
    console.log(product.tenSP)
    var productItem=new sanPhamModel({
        tenSP:product.tenSP,
        moTa:[product.moTa1,product.moTa2,product.moTa3],
        hinhAnh:[],
        thongSo:product.thongSo,
        soLuong:product.soLuong,
        giaTien:product.giaTien
    })
    product.hinhAnh.forEach(item=>{
        console.log(item.name)
        var image={
            tenImageSP: item.name,
            dataImageSP: item.size,
            contentTypeSP:item.type
        }
        productItem.hinhAnh.push(image)
    })
    productItem.tenHang=tenHang
    productItem.save().then(()=>console.log("Save product success"))
    var id=productItem._id
    var hangid=await hangService.findIDHang(tenHang)
    console.log(hangid)
    var loaiSP=await loaiSPModel.findOne({tenLoai:tenLoaiSP}).then(document=>{
        document.cacHang.forEach(itemHang=>{
            if(itemHang.idHang==hangid){
                itemHang.idCacSP.push(id)
            }
        })
        document.save()
    })
    return (productItem)
}


// lấy danh sách sản phẩm theo loại sản phẩm
var getAllProduct=async(nameProductCate)=>{
    var list=[]
    try{
    var productList=await loaiSPModel.findOne({tenLoai:nameProductCate}).then(async document=>{
        var listtt=[]
        var list=[]
        document.cacHang.forEach(async itemHang=>{
            
            var doc=await itemHang.idCacSP.forEach(itemID=>{
                console.log(itemID)
                var oneItem= getProductFromID(itemID)
                list.push(oneItem)
            })
            var tenHang=''
            var Hang=  await hangModel.findById(itemHang.idHang).then(document=>
                {
                    tenHang=document.tenNhaSX;
                }
            )
            console.log(tenHang)
        })
        const products = await Promise.all(list);
        return products
    })
    return productList
    }
    catch(error)
    {
        console.log(error)
    }
}


//lấy id của sản phẩm
var getProductFromID=(idProduct)=>{
    try{
    var product=sanPhamModel.findById(idProduct).then(document=>{
        return document
    })
    return product
    }
    catch(error){
        console.log(error)
    }
}

var getAllSanPham=async(loaiSP)=>{
    try{
        var listSP=await loaiSPModel.findOne({tenLoai:loaiSP})
        console.log(listSP)
        return listSP
    }catch(error){
        console.log(error)
    }
}

var getSP=async(idSP)=>{
    try{
        var infoSP=await sanPhamModel.findById(idSP)
        return infoSP
    }
    catch(error)
    {
        console.log(error)
    }
}
var countSP= async()=>
{
    return new Promise(function myFn(resolve, reject)
    {
        sanPhamModel.countDocuments({})
        .then((count) => {
          resolve(count);
          console.log(count);
        })
        .catch((error) => {
          reject(error);
        });
    })
}

var editSanPham=async(product, loaiSP, hangCu)=>{
    try{
        let listHinhAnh=[]
        product.hinhAnh.forEach(item=>{
            var image={
                tenImageSP: item.tenImageSP,
                dataImageSP: item.dataImageSP,
                contentTypeSP:item.contentTypeSP
            }
            listHinhAnh.push(image)
        })
        console.log(listHinhAnh)
        var sanpham=sanPhamModel.findById(product._id).then(document=>{
            document.tenSP=product.tenSP
            document.thongSo=product.thongSo
            document.giaTien=product.giaTien
            document.soLuong=product.soLuong
            document.moTa=product.moTa
            document.hinhAnh=listHinhAnh
            document.tenHang=product.tenHang
            document.save()
            if(hangCu!==product.tenHang)
            {
                changeProductToNewHang(product._id, product.tenHang, loaiSP, hangCu)
            }
            
            // console.log(document)
            return document
        })
        return sanpham
    }catch(error){
        console.log(error)
    }
}


var changeProductToNewHang=async(idSP, tenHang, loaiSP, hangCu)=>{
    try{
        let idhang=''
        var hang=await hangModel.findOne({tenNhaSX:tenHang}).then( document=>{
            idhang= document._id
        })
        let idhangCu=''
        await hangModel.findOne({tenNhaSX:hangCu}).then(hang=>{
            idhangCu=hang._id
        })
        console.log(idhangCu)
        await loaiSPModel.findOne({tenLoai:loaiSP}).then(document=>{ //remove idsp in old idhang to new id hang
            document.cacHang.forEach(item=>{
                if(item.idHang.equals(idhangCu)){
                    console.log(item.idCacSP)
                    const index=item.idCacSP.indexOf(idSP)
                    if(index!=-1)
                    {
                        item.idCacSP.splice(index,1)
                    }
                    console.log(item.idCacSP)
                }
                if(item.idHang.equals(idhang)){
                    console.log(item.idCacSP)
                    const index=item.idCacSP.indexOf(idSP)
                    if(index==-1)
                    {
                        item.idCacSP.push(idSP)
                    }
                    console.log(item.idCacSP)
                }
            })
            document.save()
        })
    }catch(error)
    {
        console.log(error)
    }
}

var deleteProduct=async(idSP, loaiSP, tenHang)=>{
    console.log(idSP)
    console.log(loaiSP)
    console.log(tenHang)
    let idHang=''
    await hangModel.findOne({tenNhaSX:tenHang}).then(document=>{
        idHang=document._id
    })
    await loaiSPModel.findOne({tenLoai: loaiSP}).then(document=>{
        document.cacHang.forEach(item=>{
            if(item.idHang.equals(idHang)){
                const index=item.idCacSP.indexOf(idSP)
                if(index!==-1){
                    item.idCacSP.splice(index,1)
                }
            }
        })
        document.save()
    })
    await sanPhamModel.findByIdAndDelete(idSP)
}

module.exports={listSP,getAllProduct,getProductFromID,getProductOfCompany,createNewCateProduct,createNewProduct, getAllSanPham, getSP, editSanPham, deleteProduct, countSP}