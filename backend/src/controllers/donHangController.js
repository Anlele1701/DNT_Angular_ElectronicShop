<<<<<<< Updated upstream
var donHangService= require('../services/donHangService')
const crypto = require("crypto");
const moment = require("moment");
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
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}

var muaHang=async(req,res)=>{
    try{
        var result=donHangService.muaHang(req.body.userOrder,req.body.cartList)
        res.send(result)
    }catch(error)
    {
        console.log(error)
    }
}

var createpayment = async (req,res) => {
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        console.log('test')
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;
        let vnpUrl = process.env.vnp_Url;
        let returnUrl = process.env.vnp_ReturnUrl;
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        let bankCode = '';

        // let locale = req.body.language;
        // if(locale === null || locale === ''){
        //     locale = 'vn';
        // }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = 'vn';
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.status(200).json({code: 200, message: vnpUrl});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

var getvnPayIPN = async (req,res) => {
    try {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];

        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let secretKey = process.env.vnp_HashSecret;
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
        //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
        //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
        if (secureHash === signed) {
            //kiểm tra checksum
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus == '0') {
                        //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                        if (rspCode == '00') {
                            //thanh cong
                            //paymentStatus = '1'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                            res.status(200).json({ RspCode: '00', Message: 'Success' });
                        } else {
                            //that bai
                            //paymentStatus = '2'
                            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                            res.status(200).json({ RspCode: '00', Message: 'Success' });
                        }
                    } else {
                        res.status(200).json({
                            RspCode: '02',
                            Message: 'This order has been updated to the payment status',
                        });
                    }
                } else {
                    res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
                }
            } else {
                res.status(200).json({ RspCode: '01', Message: 'Order not found' });
            }
        } else {
            res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

var vnPayReturn = async (req,res) => {
    try {
        let vnp_Params = req.query;

        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            res.status(200).json({ code: vnp_Params['vnp_ResponseCode'] });
        } else {
            res.status(500).json({code: '97'})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports={muaHang,createpayment,getvnPayIPN,vnPayReturn}
=======
var donHangService = require("../services/donHangService");
var Momo = require("../PaymentGateway/Momo");
const axios = require("axios");
var donHangModel = require("../models/donHangModel");

var muaHang = async (req, res) => {
  try {
    var result = donHangService.muaHang(req.body.userOrder, req.body.cartList);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const MomoPayment = async (req, res) => {
  try {
    const idDH = req.params.idDH;
    const paymentUrl = await Momo(req, idDH);
    res.json({ payUrl: paymentUrl });
  } catch (error) {
    console.error("Lỗi controller MOMO payment:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
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
module.exports = { muaHang, MomoPayment, getAllDonHangById };
>>>>>>> Stashed changes
