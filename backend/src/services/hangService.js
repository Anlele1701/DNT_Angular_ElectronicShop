var hangModel = require("../models/hangModel");
var Promise = require("bluebird");
var idHang = "";

//tạo hãng mới
var createHang = async (tenHang) => {
  var hangItem = await hangModel
    .findOne({ tenNhaSX: tenHang.tenHang })
    .then((document) => {
      if (document == null) {
        var item = new hangModel({
          tenNhaSX: tenHang.tenHang,
          cacLoaiSP: [],
        });
        item.save().then(() => console.log(item));
        return item;
      } else {
        idHang = document._id;
      }
    });
  return idHang;
};

var getAllHang = async () => {
  var listHang = await hangModel.find({}).then((document) => {
    console.log(document);
    return document;
  });
  return listHang;
};

var getAllHangFromCate = async (tenLoaiSP) => {
  var listHang = [];
  var hang = await hangModel.find({}).then((document) => {
    document.forEach((item) => {
      for (let loaiSPitem of item.cacLoaiSP) {
        if (loaiSPitem == tenLoaiSP.tenLoaiSP) {
          listHang.push(item.tenNhaSX);
          break;
        }
      }
    });
    console.log(listHang);
  });
  return listHang;
};

var findIDHang = async (tenHang) => {
  var hangid = await hangModel
    .findOne({ tenNhaSX: tenHang })
    .then(async (document) => {
      return await document.id;
    });
  return hangid;
};
var deleteHang = async (id) => {
  return new Promise(function myFn(resolve, reject) {
    hangModel
      .findById(id)
      .then((result) => {
        if (result.cacLoaiSP && result.cacLoaiSP.length > 0) {
          console.log(`Không thể xóa vì đang chứa ${result.cacLoaiSP}.`);
          reject(false);
        } else {
          hangModel
            .findByIdAndDelete(id)
            .then(() => resolve(true))
            .catch((error) => reject(error));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
var getHang = async (idHang) => {
  try {
    var infoHang = await hangModel.findById(idHang);
    return infoHang;
  } catch (error) {
    console.log(error);
  }
};
var updateHang = async (id, hangDetails) => {
  console.log("BOdy" + hangDetails);
  return new Promise((resolve, reject) => {
    hangModel
      .findByIdAndUpdate(id, hangDetails, { new: true })
      .exec()
      .then((result) => {
        resolve(result);
        return result;
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const searchHang = async (searchTerm) => {
  try {
    const result = await hangModel.find({
      tenNhaSX: { $regex: `^${searchTerm}`, $options: "i" },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  deleteHang,
  createHang,
  getAllHang,
  getAllHangFromCate,
  findIDHang,
  getHang,
  updateHang,
  searchHang,
};
