var mongoose=require('mongoose')
var Schema=mongoose.Schema
var khachHangSchema=new Schema({
    hoTen: {type:String},
    tenAvatar:{type: String},
    dataAvatar:{type: Buffer},
    contentTypeAvatar: {type:String},
    gioiTinh:{type: String},
    ngaySinh:{type:Date},
    diaChi:{type:String},
    email:{type: String},
    sdt: {type: String},
    diem: {type: Number},
},{collection:'KHACHHANG'})
module.exports=mongoose.model('KHACHHANG',khachHangSchema)