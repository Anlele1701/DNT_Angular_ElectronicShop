var donHangModel = require("../models/donHangModel");
const sanPhamModel = require("../models/sanPhamModel");

var muaHang = async (userOrder, cartList) => {
  try {
    var findUser = await donHangModel
      .findOne({ idKH: userOrder.id })
      .then(async (document) => {
        if (!document) {
          await createUserInDonHang(userOrder.id);
          return await pushDonHangIntoList(userOrder, cartList);
        } else return await pushDonHangIntoList(userOrder, cartList);
      });
    console.log(findUser);
    return findUser;
  } catch (error) {
    console.log(error);
  }
};

var createUserInDonHang = async (id) => {
  try {
    var donHang = new donHangModel({
      idKH: id,
      cacDH: [],
    });
    await donHang.save();
    return donHang;
  } catch (error) {
    console.log(error);
  }
};

var pushDonHangIntoList = async (userOrder, cartList) => {
  var findUser = await donHangModel
    .findOne({ idKH: userOrder.id })
    .then(async (document) => {
      const index = document.cacDH.length;
      const idDH = await createIDDonHang(userOrder.id, index);
      var donhang = {
        idDonHang: idDH,
        ngayDat: Date.now(),
        hinhThucTT: userOrder.ptTT,
        trangThaiTT: "Chưa thanh toán",
        trangThaiGiaoHang: "Chưa giao hàng",
        tongSLMua: userOrder.tongSL,
        tamTinh: userOrder.tamTinh,
        tienKM: userOrder.tienKM,
        thueVAT: userOrder.thueVAT,
        tongTien: userOrder.tongTien,
        CTDH: [],
      };
      await cartList.forEach(async (item) => {
        var result = await pushItemtoCTDH(item);
        console.log(result);
        donhang.CTDH.push(result);
      });
      console.log(donhang.CTDH);
      document.cacDH.push(donhang);
      document.save();
      await updateSLSanPham(cartList);
      return document;
    });
  return findUser;
};

var createIDDonHang = (id, index) => {
  index = index + 1;
  const newStringid = id.slice(-5);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return (
    day.toString() +
    month.toString() +
    year.toString() +
    hour.toString() +
    minutes.toString() +
    second.toString() +
    newStringid +
    index
  );
};

var pushItemtoCTDH = async (cartItem) => {
  var item = {
    idSP: cartItem.idSP,
    soLuongMua: cartItem.soLuongMua,
    thanhTien: cartItem.thanhTien,
  };
  return item;
};

var updateSLSanPham = async (cartList) => {
  cartList.forEach(async (item) => {
    await sanPhamModel.findById(item.idSP).then((document) => {
      document.soLuong = item.soLuongHienCo - item.soLuongMua;
      document.save();
    });
  });
};

<<<<<<< Updated upstream
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



module.exports={muaHang}
=======
const getAllDonHangById = async (userOrder) => {
  const customerId = req.params.id;
  try {
    const customerOrders = await donHangModel.find({ _id: customerId });
    return customerOrders;
  } catch (e) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error of getAllDonHangById" });
  }
};
module.exports = { muaHang, getAllDonHangById };
>>>>>>> Stashed changes
