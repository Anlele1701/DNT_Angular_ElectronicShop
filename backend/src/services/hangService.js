var hangModel=require('../models/hangModel')
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
module.exports={createHang,getAllHang}