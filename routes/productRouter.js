const express = require("express");
const router = express.Router();
const productController = require("../controller/productController")
const {privateRoute, access} = require("../middleware/privateRoute")
const reviewRouter = require("./reviewRouter");
const upload = require("../utils/multer");

router.use("/:productId/review", reviewRouter);

router.get("/",productController.getAllProducts)
router.get("/:id",productController.getOneProduct)
router.post("/",privateRoute, upload.array("assets",10), productController.createProduct)
router.patch("/:id", privateRoute, access("admin","guide"), productController.updateProduct)
router.delete("/:id", privateRoute, access("admin"), productController.deleteProduct)

router.get("/search/:text", productController.searchProducts);


module.exports=router;