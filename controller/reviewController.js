const Review = require("../model/review");
const { asyncCatch } = require("../utils/asyncCatch");


exports.getReviewsByProductId = asyncCatch(async (req, res) => {
    const productId = req.params.productId;

    const reviews = await Review.find({ product: productId });

    res.status(200).json({
        success: true, 
        quantity: reviews.length,
        data:{
            reviews,
        }, 
    });
});

exports.createReview = asyncCatch(async (req, res) => {
    let review = await Review.create({
        ...req.body,
        product: req.params.productId,
        creator: req.user._id,
    });
    res.json({
        success: true,
        review
    });

})

exports.updateReview = asyncCatch(async (req, res) => {
    const id = req.params.id;
    const reviews = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!reviews) return next(new GlobalError("Invalid ID!", 404));

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });

})

exports.deleteReview = asyncCatch(async (req, res) => {
    const id = req.params.id;

        const reviews = await Review.findByIdAndDelete(id);
    
        if (!reviews) return next(new GlobalError("Invalid ID!", 404));
    
        res.status(201).json({
            success:true,
            data:{
                reviews
            },
        }) 

})
