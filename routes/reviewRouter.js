const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController =require('../controller/reviewController');
const { privateRoute } = require("../middleware/privateRoute");


router.get("/", reviewController.getReviewsByProductId);
router.post("/",privateRoute, reviewController.createReview);
router.patch("/:id", privateRoute,reviewController.updateReview);
router.delete("/:id",reviewController.deleteReview);

module.exports = router;