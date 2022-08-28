const express = require("express");
const router = express.Router();

const productController = require("../controller/productController")

// GET //*Getting all products*//
router.get("/",productController.getAllProducts)

// GET //*Getting one product*//
router.get("/:id",productController.getOneProduct)


module.exports=router;