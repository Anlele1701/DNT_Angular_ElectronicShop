const hangModel = require("../models/hangModel");
var loaiSPModel = require("../models/loaiSPModel");
var hangService = require("../services/hangService");
var sanPhamService = require("../services/sanPhamService");

var listIDSP = [];
var cateID = "";

//tìm các sp theo loại sp và hãng của sp
var getProductsOfCompany = async (tenLoaiSP, idHang) => {
  try {
    var listItem = await loaiSPModel
      .findOne({ tenLoai: tenLoaiSP })
      .then((document) => {
        var itemHang = document.cacHang.forEach((element) => {
          if (element.idHang === idHang) {
            listIDSP = element.idCacSP;
          }
        });
      });
    return listIDSP;
  } catch (error) {
    console.error(error);
  }
};

//tìm id của loại sp
var findCateID = async (tenLoaiSP) => {
  try {
    const idLoaiSP = await loaiSPModel
      .findOne({ tenLoai: tenLoaiSP })
      .then((document) => {
        cateID = document.id;
        return idLoaiSP;
      });
  } catch (error) {
    console.error(error);
  }
};

//thêm loại sản phẩm vào hãng
var createnewLoaiSPtoHang = async (sp) => {
  try {
    var item = await hangModel
      .findOne({ tenNhaSX: sp.tenHang })
      .then(async (document) => {
        document.cacLoaiSP.push(sp.tenLoaiSP);
        document.save();
        var hangItem = { idHang: document._id };
        var loaiSP = await loaiSPModel
          .findOne({ tenLoai: sp.tenLoaiSP })
          .then((document1) => {
            document1.cacHang.push(hangItem);
            document1.save();
          });
        return document;
      });
    return item;
  } catch (error) {
    console.error(error);
  }
};

var countLoaiSP = async () => {
  try {
    var count = loaiSPModel.find({}).then((document) => {
      var listLoaiSP = [];
      document.forEach((item) => {
        listLoaiSP.push(item);
      });
      console.log(document.length);
      return { sumLoaiSP: document.length, listLoaiSP: listLoaiSP };
    });
    return count;
  } catch (error) {
    console.log(error);
  }
};

var createLoaiSP = async (req) => {
  try {
    var newLoaiSP = new loaiSPModel({
      tenLoai: req.body.tenLoai,
    });
    newLoaiSP.save().then((document) => console.log(document));
    return newLoaiSP;
  } catch (error) {
    console.log(error);
  }
};
const deleteLoaiSP = async (req) => {
  try {
    const LoaiSPId = req.params.id;
    const LoaiSP = await loaiSPModel.findById(LoaiSPId);
    if (!LoaiSP) {
      return { status: 404, message: "Not found Loại Sản Phẩm để xóa" };
    }
    if (LoaiSP.cacHang != null && LoaiSP.cacHang.length > 0) {
      const hangInfo = LoaiSP.cacHang.map((hang) => {
        return {
          idHang: hang.idHang._id,
          idCacSP: hang.idCacSP._id,
        };
      });
      return {
        status: 400,
        message: `Loại sản phẩm có và ${JSON.stringify(
          hangInfo
        )} không thể xóa`,
      };
    }
    const deletedLSP = await loaiSPModel.findByIdAndDelete(LoaiSPId);
    if (!deletedLSP) {
      return { status: 500, message: "Lỗi không thể xóa Loại Sản Phẩm" };
    }
    return {
      status: 200,
      message: `Loại sản phẩm đã xóa là ${deletedLSP._id} : ${deletedLSP.tenLoai}`,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Lỗi catch services" };
  }
};

const updateLoaiSP = async (req) => {
  try {
    const LoaiSPId = req.params.id;
    const updateLoaiSP = req.body;

    const LoaiSP = await loaiSPModel.findById(LoaiSPId);
    if (!LoaiSP) {
      return { status: 404, message: "Not found Loại Sản Phẩm để update" };
    }
    const updateLSP = await loaiSPModel.findByIdAndUpdate(
      LoaiSPId,
      updateLoaiSP,
      { new: true }
    );
    if (!updateLSP) {
      return { status: 500, message: "Lỗi không thể cập nhật loại sản phẩm" };
    }

    return {
      status: 200,
      message: `Loại sản phẩm đã cập nhật ${updateLSP.tenLoai}`,
      updateLSP,
    };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Lỗi service update Loại Sản Phẩm" };
  }
};
var getAllLoaiSP = async () => {
  var listLoaiSP = await loaiSPModel.find({}).then((document) => {
    console.log(document);
    return document;
  });
  return listLoaiSP;
};
const searchLoai = async (searchTerm) => {
  try {
    const result = await loaiSPModel.find({
      tenLoai: { $regex: `^${searchTerm}`, $options: "i" },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  listIDSP,
  getProductsOfCompany,
  findCateID,
  cateID,
  createnewLoaiSPtoHang,
  countLoaiSP,
  createLoaiSP,
  deleteLoaiSP,
  updateLoaiSP,
  getAllLoaiSP,
  searchLoai,
};
