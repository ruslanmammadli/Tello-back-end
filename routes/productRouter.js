const express = require("express");
const router = express.Router();

const productController = require("../controller/productController")

// GET //*Getting all products*//
router.get("/",productController.getAllProducts)

// GET //*Getting one product*//
router.get("/:id",productController.getOneProduct)

// POST //*Create new product*//
router.post("/",productController.createProduct)

//UPDATE //*Update product*//
router.patch("/:id",productController.updateProduct)

//DELETE //*Delete product*//
router.delete("/:id",productController.deleteProduct)


module.exports=router;