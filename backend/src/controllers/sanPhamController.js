const { count } = require("../models/hangModel");
const { json } = require("body-parser");
var sanPhamService = require("../services/sanPhamService");
const loaiSPModel = require("../models/loaiSPModel");
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
const searchSP = async (req, res) => {
  try {
    const category = req.params.nameProduct;
    const searchTerm = req.params.searchTerm;
    console.log({ category, searchTerm });
    const items = await sanPhamService.searchSP(category, searchTerm);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getProductFromCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const result = await sanPhamService.getProductFromCategory(category);
    if (!result) {
      return { message: "Product not found" };
    }
    console.log("Thành công", result);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "Internal Server Error" });
  }
};
const getSPCompare = async (req, res) => {
  try {
    const { product1, product2 } = req.body;
    const category = req.params.category;
    console.log({ product1, product2, category });
    const result = await sanPhamService.getSPCompare(
      category,
      product1,
      product2
    );
    if (!result || !result.product1 || !result.product2) {
      return res.json(result.error);
    }
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
var findSP = async (req, res) => {
  console.log(req.params.tenSP)
  var result = await sanPhamService.findSP(req.params.tenSP);
  if (result) {
    res.send(result);
  }
  else{
    res.send({status: false})
  }
}
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
  searchSP,
  getSPCompare,
  getProductFromCategory,
  getAll,
  findSP
};
