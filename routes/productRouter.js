const express = require("express");
const router = express.Router();
const productController = require("../controller/productController")
const {privateRoute} = require("../middleware/privateRoute")

// GET //*Getting all products*//
router.get("/",productController.getAllProducts)

// GET //*Getting one product*//
router.get("/:id",productController.getOneProduct)

// POST //*Create new product*//
router.post("/", privateRoute, productController.createProduct)

//PATCH //*Update product*//
router.patch("/:id", privateRoute, productController.updateProduct)

//DELETE //*Delete product*//
router.delete("/:id", privateRoute, productController.deleteProduct)


module.exports=router;