var sanPhamService=require('../services/sanPhamService')
var getProductsOfCompany=async(req,res)=>{
    var products=await sanPhamService.getProductOfCompany(req.params.tenLoai,req.params.idHang)
    res.send(products)
}
var createNewCateProduct=async(req,res)=>{
    var product= await sanPhamService.createNewCateProduct()
    res.send(products)
}

var createNewProduct=async(req,res)=>
{
    try{
        var product=await sanPhamService.createNewProduct(req)
        console.log(req.body.product.tenSP)
        res.send(product)
    }catch(err)
    {
        console.error(err)
    }
}

var getAllProduct=async(req,res)=>{
    try{
        var listProduct=await sanPhamService.getAllProduct(req.body.nameProductCate)
        res.send(listProduct)
    }catch(error) {console.log(error)}
}

module.exports={getProductsOfCompany,createNewCateProduct, createNewProduct,getAllProduct}