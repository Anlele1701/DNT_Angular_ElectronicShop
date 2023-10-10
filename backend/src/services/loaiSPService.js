var loaiSPModel=require('../models/loaiSPModel')
var listIDSP=[]
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
module.exports={listIDSP,getProductsOfCompany}