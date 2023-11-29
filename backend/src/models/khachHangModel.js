var mongoose=require('mongoose')
var Schema=mongoose.Schema
var khachHangSchema=new Schema({
    hoTen: {type:String},
    tenAvatar:{type: String},
    email:{type: String},
    sdt: {type: String},
    matKhau:{type:String},
    diem: {type: Number, default:0},
    verified:{type:Boolean},
    emailToken:{type:String},
    dateCreated:{type:Date, default:Date.now()},
    hangThanhVien:{type:String,default:'Đồng'}
},{collection:'KHACHHANG'})
module.exports=mongoose.model('KHACHHANG',khachHangSchema)