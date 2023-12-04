var loaiSPService = require("../services/loaiSPService");

var createnewLoaiSPtoHang = async (req, res) => {
  var createNew = await loaiSPService.createnewLoaiSPtoHang(req.body);
  res.send(createNew);
};

var countLoaiSP = async (req, res) => {
  var sumLoaiSP = await loaiSPService.countLoaiSP();
  res.send(sumLoaiSP);
};

var createLoaiSP = async (req, res) => {
  var newLoaiSP = await loaiSPService.createLoaiSP(req);
  res.send(newLoaiSP);
};

const deleteLoaiSP = async (req, res) => {
  try {
    const result = await loaiSPService.deleteLoaiSP(req);
    if (result.status === 200) {
      res.send({ status: true, message: result.message });
    } else if (result.status === 404 || result.status === 400) {
      res.send({ message: result.message });
    } else {
      res.send({ message: result.message });
    }
  } catch (e) {
    console.error(e);
    res.send({ error: "Lỗi controller deleteLoaiSP" });
  }
};
const updateLoaiSP = async (req, res) => {
  try {
    const result = await loaiSPService.updateLoaiSP(req);
    if (result.status === 200) {
      res.send({ status: true, message: result.message });
    } else if (result.status === 404 || result.status === 400) {
      res.send({ message: result.message });
    } else {
      res.send({ message: result.message });
    }
  } catch (err) {
    console.error(err);
    res.send({ error: "Lỗi controller updateLoaiSP" });
  }
};

module.exports = {
  createnewLoaiSPtoHang,
  countLoaiSP,
  createLoaiSP,
  deleteLoaiSP,
  updateLoaiSP,
};
