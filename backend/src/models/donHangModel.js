var mongoose=require('mongoose')
var Schema= mongoose.Schema
var donHangSchema=new Schema({
    idKH: {type:mongoose.Schema.Types.ObjectId,ref:'KHACHHANG'},
    cacDH: {type: [
        {
            idDonHang: {type:String},
            ngayDat: {
                type:Date,
                default: Date.now
            },
            nguoiNhan:{type: String},
            sdt: {type: String},
            diaChi: {type: String},
            hinhThucTT: {type:String},
            trangThaiTT: {type: String},
            trangThaiGiaoHang: {type:String},
            tongSLMua: {type:Number, int:true},
            tamTinh: {type:Number},
            tienKM: {type: Number},
            thueVAT: {type: Number},
            tongTien: {type: Number},
            CTDH: {type:[
                {
                    idSP: {type: mongoose.Schema.Types.ObjectId,ref:'SANPHAM'},
                    soLuongMua: {type:Number, int: true},
                    thanhTien: {type: Number}
                }
            ]}
        }
    ]}
},{collection:'DONHANG'})
module.exports=mongoose.model('DONHANG',donHangSchema)