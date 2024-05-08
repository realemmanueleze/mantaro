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
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
