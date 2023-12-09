var hangService = require("../services/hangService");

var createNewHang = async (req, res) => {
  var hangItem = await hangService.createHang(req.body);
  res.send(hangItem);
};
var getAllHang = async (req, res) => {
  var hangList = await hangService.getAllHang();
  res.send(hangList);
};

var getAllHangFromCate = async (req, res) => {
  var hangList = await hangService.getAllHangFromCate(req.body);
  res.send(hangList);
};
var deleteHang = async (req, res) => {
  console.log("Đã xóa " + req.params.id);
  try {
    await hangService.deleteHang(req.params.id);
    res.send({ status: true, message: "Xóa thành công" });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
};
var getHang = async (req, res) => {
  var infoHang = await hangService.getHang(req.params.idHang);
  res.send(infoHang);
};
var updateHang = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  var result = await hangService.updateHang(req.params.id, req.body);
  if (result) {
    res.send({ status: true, message: "Updated" });
  } else {
    res.send({ status: false, message: "Wat the fuck" });
  }
};
const searchHang = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const items = await hangService.searchHang(searchTerm);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createNewHang,
  getAllHang,
  getAllHangFromCate,
  deleteHang,
  getHang,
  updateHang,
  searchHang,
};
