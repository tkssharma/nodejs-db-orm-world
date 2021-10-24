const Product = require('../data/dao/products');

async function getAllProducts(req, res) {
  const all = await Product.all();
  return res.json(all);
}

async function getProduct(req, res) {
  const user = await Product.get(req.params.id);
  return res.send(user);
}

async function createProduct(req, res) {
  // validation JOI
  const created = await Product.create({ ...req.body });
  return res.json(created);
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct
}