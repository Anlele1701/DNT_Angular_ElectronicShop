const { count } = require("../models/hangModel");
const { json } = require("body-parser");
var sanPhamService = require("../services/sanPhamService");
var getProductsOfCompany = async (req, res) => {
  var products = await sanPhamService.getProductOfCompany(
    req.params.tenLoai,
    req.params.idHang
  );
  res.send(products);
};
var createNewCateProduct = async (req, res) => {
  var product = await sanPhamService.createNewCateProduct();
  res.send(products);
};

var createNewProduct = async (req, res) => {
  try {
    const jsonData = JSON.parse(req.body.product);
    console.log(jsonData);
    var product = await sanPhamService.createNewProduct(
      jsonData,
      req.body.tenLoaiSP,
      req.body.tenHang
    );
    res.send(product);
  } catch (err) {
    console.error(err);
  }
};

var getAllProduct = async (req, res) => {
  try {
    var listProduct = await sanPhamService.getAllProduct(
      req.body.nameProductCate
    );
    res.send(listProduct);
  } catch (error) {
    console.log(error);
  }
};

var getAllSanPham = async (req, res) => {
  try {
    var listProduct = await sanPhamService.getAllSanPham(req.params.loaiSP);
    res.send(listProduct);
  } catch (error) {
    console.log(error);
  }
};

var getSP = async (req, res) => {
  try {
    var infoSP = await sanPhamService.getSP(req.params.idSP);
    res.send(infoSP);
  } catch (error) {
    console.log(error);
  }
};
var countSP = async (req, res) => {
  try {
    var result = await sanPhamService.countSP();
    if (result) {
      res.send({ result });
    } else {
      res.send({ status: true, message: "Thất bại" });
    }
  } catch (error) {
    console.log(error);
  }
};
var editProduct = async (req, res) => {
  try {
    const jsonData = JSON.parse(req.body.product);
    var editSP = await sanPhamService.editSanPham(
      jsonData,
      req.body.loaiSP,
      req.body.tenHang
    );
    res.send(editSP);
  } catch (error) {
    console.log(error);
  }
};

var deleteProduct = async (req, res) => {
  try {
    var deleteSP = sanPhamService.deleteProduct(
      req.params.idSP,
      req.params.loaiSP,
      req.params.tenHang
    );
    res.send({ success: "success" });
  } catch (error) {
    console.log(error);
  }
};
var getAll = async (req, res) => {
  try {
    var listProduct = await sanPhamService.getAll();
    res.send(listProduct);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getProductsOfCompany,
  createNewCateProduct,
  createNewProduct,
  getAllProduct,
  getAllSanPham,
  getSP,
  editProduct,
  deleteProduct,
  countSP,
  getAll,
};
