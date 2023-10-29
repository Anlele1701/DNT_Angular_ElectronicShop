var mongoose=require('mongoose')
var Schema=mongoose.Schema
var sanPhamSchema=new Schema({
    tenSP: {type:String},
    moTa: {type:[String]},
    hinhAnh: {type:[{
        tenImageSP: {type:String},
        dataImageSP: {type: Buffer},
        contentTypeSP:{type: String}
    }]},
    ngayTao: {type:Date},
    thongSo: {type:Object},
    soLuong: {
        type:Number,
        int: true
    },
    giaTien: {type:Number},
    tenHang: {type:String}
},{collection:'SANPHAM'})
module.exports=mongoose.model('SANPHAM',sanPhamSchema)