var hangModel=require('../models/hangModel')
var Promise = require("bluebird");
var idHang=''

//tạo hãng mới
var createHang=async(tenHang)=>{
    var hangItem=await hangModel.findOne({tenNhaSX:tenHang.tenHang}).then(document=>{
        if(document==null)
        {
            var item=new hangModel({
                tenNhaSX:tenHang.tenHang,
                cacLoaiSP:[]
            })
            item.save().then(()=>console.log(item))
            return item
        }
        else
        {
            idHang= document._id
        }
    })
    return idHang
}

var getAllHang=async()=>{
    var listHang=await hangModel.find({}).then(document=>{
        console.log(document)
        return document
    })
    return listHang
}

var getAllHangFromCate=async(tenLoaiSP)=>{
    var listHang=[]
    var hang=await hangModel.find({}).then(document=>{
        document.forEach(item=>{
            for(let loaiSPitem of item.cacLoaiSP)
            {
                if(loaiSPitem==tenLoaiSP.tenLoaiSP){
                    listHang.push(item.tenNhaSX)
                    break
                }
            }
        })
        console.log(listHang)
    })
    return listHang
}

var findIDHang=async(tenHang)=>{
    var hangid=await hangModel.findOne({tenNhaSX:tenHang}).then(async document=>{
        return await document.id
    })
    return hangid
}
var deleteHang = async(id) => {
    return new Promise(function myFn(resolve, reject)
    {
        hangModel.findByIdAndDelete(id).then((result) =>
        {
            if(result)
            {
                resolve(true);
            }
            else
            reject(false);
        })
        .catch((error) => {
            reject(error); 
        })
    })
}
module.exports={deleteHang, createHang,getAllHang,getAllHangFromCate,findIDHang}