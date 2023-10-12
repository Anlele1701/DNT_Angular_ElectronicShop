var mongoose=require('mongoose')
var Schema=mongoose.Schema
var hangSchema=new Schema({
    tenNhaSX: {type:String},
    cacLoaiSP: {type:[String]}
},{collection:'HANG'})
module.exports=mongoose.model('HANG',hangSchema)