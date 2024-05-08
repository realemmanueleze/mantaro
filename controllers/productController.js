const getAllProducts = ({ req, res, next }) => {
  res.send("Get all products");
};
const getSingleProduct = ({ req, res, next }) => {
  res.send("Get single product");
};
const createProduct = ({ req, res, next }) => {
  res.send("Create product");
};
const updateProduct = ({ req, res, next }) => {
  res.send("Update product");
};
const deleteProduct = ({ req, res, next }) => {
  res.send("Delete product");
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
