const express = require("express");
const router = express.Router();
const basketController = require('../controller/basketController');
const { privateRoute } = require("../middleware/privateRoute");


router.get("/", privateRoute, basketController.getBasket);
router.post("/", privateRoute, basketController.addProductToBasket);
router.delete("/product/:id", privateRoute, basketController.removeProductFromBasket);
router.delete("/", privateRoute, basketController.clearBasket);
router.patch("/", privateRoute, basketController.updateBasket);


module.exports = router;