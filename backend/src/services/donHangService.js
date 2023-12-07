var donHangModel=require('../models/donHangModel')
const khachHangModel = require('../models/khachHangModel')
const sanPhamModel = require('../models/sanPhamModel')

var muaHang=async(userOrder,cartList)=>{
    try{
        var findUser=await donHangModel.findOne({idKH:userOrder.id}).then(async document=>{
            if(!document){
                await createUserInDonHang(userOrder.id)
                return await pushDonHangIntoList(userOrder,cartList)
            }else return await pushDonHangIntoList(userOrder,cartList)
        })
        console.log(findUser)
        return findUser
    }catch(error)
    {
        console.log(error)
    }
}


var createUserInDonHang=async(id)=>{
    try{
        var donHang=new donHangModel({
            idKH:id,
            cacDH:[]
        })
        await donHang.save()
        return donHang
    }catch(error){
        console.log(error)
    }
}

var pushDonHangIntoList=async(userOrder, cartList)=>{
    var findUser=await donHangModel.findOne({idKH:userOrder.id}).then(async document=>{
        const index=document.cacDH.length
        const idDH=await createIDDonHang(userOrder.id, index)
        var donhang={
            idDonHang:idDH,
            nguoiNhan: userOrder.hoten,
            diaChi: userOrder.address,
            sdt: userOrder.sdt,
            ngayDat: Date.now(),
            hinhThucTT: userOrder.ptTT,
            trangThaiTT: 'Chưa thanh toán',
            trangThaiGiaoHang: 'Chưa giao hàng',
            tongSLMua: userOrder.tongSL,
            tamTinh: userOrder.tamTinh,
            tienKM: userOrder.tienKM,
            thueVAT: userOrder.thueVAT,
            tongTien:userOrder.tongTien,
            CTDH:[]
        }
        await cartList.forEach(async item=>{
            var result=await pushItemtoCTDH(item)
            console.log(result)
            donhang.CTDH.push(result)
            
        })
        console.log(donhang.CTDH)
        document.cacDH.push(donhang)
        document.save()
        await updateSLSanPham(cartList)
        return document
    })
    return findUser
}


var createIDDonHang=(id,index)=>{
    index=index+1
    const newStringid=id.slice(-5)
    const date=new Date()
    const year=date.getFullYear()
    const month=date.getMonth()+1
    const day=date.getDate()
    const hour=date.getHours()
    const minutes=date.getMinutes()
    const second=date.getSeconds()
    return (day.toString()+month.toString()+year.toString()+hour.toString()+minutes.toString()+second.toString()+newStringid+index)
}

var pushItemtoCTDH=async(cartItem)=>{
    var item={
        idSP: cartItem.idSP,
        soLuongMua: cartItem.soLuongMua,
        thanhTien: cartItem.thanhTien
    }
    return item
}

var updateSLSanPham=async(cartList)=>{
    cartList.forEach(async item=>{
        await sanPhamModel.findById(item.idSP).then(document=>{
            document.soLuong=item.soLuongHienCo-item.soLuongMua
            document.save()
        })
    })
}

var QLDSDonHang=async()=>{
    try{
        return await donHangModel.find().then(async documents=>{
            var listDH=[]
            await Promise.all(documents.map(async item=>{
                var idKH=item.idKH
                var tenNguoiDat=await findUsername(item.idKH)
                await Promise.all(item.cacDH.map(dh=>{
                    let a={
                        idKH: idKH,
                        tenNguoiDat: tenNguoiDat,
                        donHang: {}
                    }
                    a.donHang=dh
                    listDH.push(a)
                }))
            }))
            return listDH
        })
    }catch(error){
        console.log(error)
    }
}

var findUsername=async(idKH)=>{
    let tenKH=await khachHangModel.findById(idKH).then(document=>{
        return document.hoTen
    })
    return tenKH
}

var getCTDH=async(idKH, idDH)=>{
    try{
        return await donHangModel.findOne({idKH:idKH}).then(document=>{
            return document.cacDH.find(item=>item.idDonHang===idDH)
        })
    }catch(error)
    {
        console.log(error)
    }
}

var updateTTDonHang=async(info)=>{
    try{
        return await donHangModel.findOne({idKH:info.idKH}).then(document=>{
            const index=document.cacDH.findIndex(item=>item.idDonHang===info.idDH)
            if(index!==-1)
            {
                document.cacDH[index].diaChi=info.diaChi
                document.cacDH[index].nguoiNhan=info.nguoiNhan
                document.cacDH[index].sdt=info.sdt
                document.cacDH[index].diaChi=info.diaChi
                document.save()
            }
            return 'Success'
        })
    }catch(error)
    {
        console.log(error)
    }
}


var huyDonHang=async(info)=>{
    try{
        return await donHangModel.findOne({idKH:info.idKH}).then(document=>{
            const index=document.cacDH.findIndex(item=>item.idDonHang===info.idDH)
            if(index!==-1)
            {
                document.cacDH[index].trangThaiTT='Đã hủy'
                document.cacDH[index].trangThaiGiaoHang='Đã hủy'
                document.save()
            }
            return 'Success'
        })
    }catch(error)
    {
        console.log(error)
    }
}

var khoiPhucDonHang=async(info)=>{
    try{
        return await donHangModel.findOne({idKH:info.idKH}).then(document=>{
            const index=document.cacDH.findIndex(item=>item.idDonHang===info.idDH)
            if(index!==-1)
            {
                document.cacDH[index].trangThaiTT='Chưa thanh toán'
                document.cacDH[index].trangThaiGiaoHang='Chưa giao hàng'
                document.save()
            }
            return 'Success'
        })
    }catch(error)
    {
        console.log(error)
    }
}
var showdonhang=async(idKH)=>{
    var arraydh = []
    var listdonhang = await donHangModel.findOne({idKH:idKH}).then(document=>{
        document.cacDH.forEach( item =>{ arraydh.push(item)})
    })
    return arraydh
}
module.exports={muaHang, QLDSDonHang, getCTDH, updateTTDonHang,huyDonHang,khoiPhucDonHang,showdonhang}