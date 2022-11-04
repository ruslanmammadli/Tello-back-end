const Category = require("../model/category");
const { asyncCatch } = require("../utils/asyncCatch");
const GlobalFilter = require("../utils/GlobalFilter");
const cloudinary = require("../utils/cloudinary");


exports.getAllCategories = asyncCatch(async (req, res) => {
  let allCategories = await new GlobalFilter(Category.find(), req.query);
  allCategories.filter();

  const categories = await allCategories.query;

  res.json({
      success: true,
      quantity: categories.length,
      data: {
          categories
      }
  });

})


exports.createCategory = asyncCatch(async (req, res, next) => {
    const request = { ...req.body };
  
    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.path);
      request.image = {
        url: img.url,
        publicId: img.public_id,
      };
    }
  
    const category = await Category.create(request);
  
    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  });


  exports.updateCategory = asyncCatch(async (req, res, next) => {
    const request = { ...req.body };
  
    if (req.file) {
      const img = await cloudinary.uploader.upload(req.file.path);
      request.image = {
        url: img.url,
        publicId: img.public_id,
      };
    }
  
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  
    if (!category) return next(new GlobalError("Invalid ID!", 404));
  
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  });

  exports.deleteCategory = asyncCatch(async (req, res, next) => {
    const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
    
        if (!category) return next(new GlobalError("Invalid ID!", 404));
    
        res.status(201).json({
          success:true,
          data:{
            category
          },
      }) 
  });
  