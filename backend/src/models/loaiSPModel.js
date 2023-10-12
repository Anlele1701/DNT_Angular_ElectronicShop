var mongoose=require('mongoose')
const { collection } = require('./donHangModel')
var Schema=mongoose.Schema
var loaiSPSchema=new Schema({
    tenLoai: {type: String},
    cacHang: {type:[{
        idHang:{type:mongoose.Schema.Types.ObjectId,ref:'HANG'},
        idCacSP:[{type: mongoose.Schema.Types.ObjectId,ref:'SANPHAM'}
        ]
    }]}
},{collection:'LOAISP'})
module.exports=mongoose.model('LOAISP',loaiSPSchema)