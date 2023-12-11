var donHangService = require("../services/donHangService");
const crypto = require("crypto");
const moment = require("moment");
var Momo = require("../PaymentGateway/Momo");
var donHangModel = require("../models/donHangModel");

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

var muaHang = async (req, res) => {
  try {
    var result = donHangService.muaHang(req.body.userOrder, req.body.cartList);
    console.log("result:", result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
var muaHangTA = async (req, res) => {
  try {
    var result = await donHangService.muaHangTA(
      req.body.userOrder,
      req.body.cartList
    );
    console.log("result:", result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
var createpayment = async (req, res) => {
  try {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    console.log("test");
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");
    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    let returnUrl = process.env.vnp_ReturnUrl;
    let index=0
    let idDH=''
    var findUser = await donHangModel
      .findOne({ idKH: req.body.userOrder.id })
      .then(async (document) => {
        index = document.cacDH.length;
        idDH = await donHangService.createIDDonHang(req.body.userOrder.id, index);
      })
    let orderId = idDH;
    let amount = req.body.userOrder.tongTien;
    let bankCode = "";
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.status(200).json({ code: 200, message: vnpUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

var getvnPayIPN = async (req, res) => {
  try {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];
    let orderId = vnp_Params["vnp_TxnRef"];
    let rspCode = vnp_Params["vnp_ResponseCode"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = process.env.vnp_HashSecret;
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    let paymentStatus = "0";
    let checkOrderId = true;
    let checkAmount = true;
    if (secureHash === signed) {
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus == "0") {
            if (rspCode == "00") {
              res.status(200).json({ RspCode: "00", Message: "Success" });
            } else {
              res.status(200).json({ RspCode: "00", Message: "Success" });
            }
          } else {
            res.status(200).json({
              RspCode: "02",
              Message: "This order has been updated to the payment status",
            });
          }
        } else {
          res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
        }
      } else {
        res.status(200).json({ RspCode: "01", Message: "Order not found" });
      }
    } else {
      res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

var vnPayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      res.status(200).json({ code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.status(500).json({ code: "97" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

var muaHang = async (req, res) => {
  try {
    var result = donHangService.muaHang(req.body.userOrder, req.body.cartList);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
var QLDSDonHang = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log(searchTerm);
    var list = await donHangService.QLDSDonHang(searchTerm);
    res.send(list);
  } catch (error) {
    console.log(error);
  }
};

var getCTDH = async (req, res) => {
  try {
    var ctdh = await donHangService.getCTDH(req.params.idKH, req.params.idDH);
    console.log(ctdh);
    res.send(ctdh);
  } catch (error) {
    console.log(error);
  }
};
const MomoPayment = async (req, res) => {
  try {
    const idDH = req.body.idDH;
    const paymentUrl = await Momo(req, idDH);
    res.json({ payUrl: paymentUrl });
  } catch (error) {
    console.error("Lỗi controller MOMO payment:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
var updateTTDonHang = async (req, res) => {
  try {
    var update = await donHangService.updateTTDonHang(req.body.infoOrder);
    res.send({ noti: update });
  } catch (error) {
    console.log(error);
  }
};
const getAllDonHangById = async (req, res) => {
  try {
    const ordersList = await donHangService.getAllDonHangById(req.params.id);
    res.send(ordersList);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error of getAllDonHangById controller",
    });
  }
};
var getAllDonHang = async (req, res) => {
  try {
    var result = await donHangService.getAllDonHang();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
var huyDonHang = async (req, res) => {
  try {
    var update = await donHangService.huyDonHang(req.body.infoOrder);
    res.send({ noti: update });
  } catch (error) {
    console.log(error);
  }
};
var khoiPhucDonHang = async (req, res) => {
  try {
    var update = await donHangService.khoiPhucDonHang(req.body.infoOrder);
    res.send({ noti: update });
  } catch (error) {
    console.log(error);
  }
};
var showdonhang = async (req, res) => {
  try {
    var result = await donHangService.showdonhang(req.params.idKH);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
const confirmMomoSuccess = async (req, res) => {
  try {
    const orderInfo = req.body.orderInfo;
    const result = await donHangService.confirmMomoSuccess(orderInfo);
    console.log(result);
    return {
      status: 200,
      message: "Confirm momo thành công",
      data: result,
    };
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi controller confirm momo" });
  }
};
module.exports = {
  muaHang,
  createpayment,
  getvnPayIPN,
  vnPayReturn,
  MomoPayment,
  getAllDonHangById,
  getAllDonHang,
  khoiPhucDonHang,
  huyDonHang,
  updateTTDonHang,
  QLDSDonHang,
  getCTDH,
  showdonhang,
  confirmMomoSuccess,
  muaHangTA,
};
