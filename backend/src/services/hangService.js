var hangModel=require('../models/hangModel')
var idHang=''
var createHang=async(tenHang)=>{
    var hangItem=await hangModel.findOne({tenNhaSX:tenHang}).then(document=>{
        if(document==null)
        {
            var item=new hangModel({
                tenNhaSX:tenHang,
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
module.exports={createHang}