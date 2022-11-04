const express = require("express");
const router = express.Router();
const categoryController=require('../controller/categoryController');
const {privateRoute, access} = require("../middleware/privateRoute")
const upload = require("../utils/multer");

router.get("/", categoryController.getAllCategories);
router.post("/",privateRoute,upload.single("photo"),categoryController.createCategory);
router.patch("/:id",privateRoute,access("admin"),upload.single("photo"),categoryController.updateCategory);
router.delete("/:id",privateRoute,access("admin"),categoryController.deleteCategory);

module.exports = router;