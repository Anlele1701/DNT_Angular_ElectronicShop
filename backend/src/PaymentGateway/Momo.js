const crypto = require("crypto");
const https = require("https");
const donHangModel = require("../models/donHangModel");

const Momo = async (req, idDH) => {
  try {
    var amount = req.body.amount;
    //Config
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = idDH;
    var redirectUrl = "http://localhost:4200/client/personal";
    var ipnUrl = "https://callback.url/notify";
    /// Dữ liệu động
    //var amount = amountFound.toString();
    //var amount = "678900";
    console.log(amount);
    var requestType = "captureWallet";
    var extraData = "";
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;

    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });
    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding("utf8");
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          console.log("No more data in response.");
          const responseBody = JSON.parse(data);
          const paymentUrl = responseBody.payUrl;
          console.log("Payment URL:", paymentUrl);
          resolve(paymentUrl);
        });
      });

      req.on("error", (error) => {
        console.error("Error in request:", error);
        reject(error);
      });

      console.log("Sending....");
      console.log("request Body:", requestBody);
      req.write(requestBody);
      req.end();
    });
  } catch (error) {
    console.log("Lỗi thanh toán momo", error);
    throw error;
  }
};
module.exports = Momo;
