const Product = require("../model/product")
const GlobalFilter = require("../utils/GlobalFilter")
const {asyncCatch} = require("../utils/asyncCatch")
const GlobalError = require("../error/GlobalError")
const cloudinary = require("../utils/cloudinary");

exports.getAllProducts = asyncCatch( async (req,res) => {

    let allProducts = new GlobalFilter(Product.find(), req.query)
    allProducts
    .filter()

    const products = await allProducts.query

    res.json({
        success:true,
        quantity:products.length,
        data:{
            products,
        },
    })
})

exports.getOneProduct=asyncCatch( async (req,res,next) => {

    const id = req.params.id
    const oneProduct= await Product.findById(id)

    if (!oneProduct) return next(new GlobalError("Invalid Id: FINDONE",404))

    res.status(200).json({
        success:true,
        data:{
            oneProduct
        }
    })
})

exports.createProduct= asyncCatch( async (req,res,next) => {
   
    const images = [];
    const request = { ...req.body };
  
    if (req.files) {
      for (const el of req.files) {
        const img = await cloudinary.uploader.upload(el.path);
        images.push({ url: img.secure_url, publicId: img.public_id });
        
      }
  
      request.assets = images;
    }

    const newProduct = await Product.create(request)
    
    res.status(201).json({
        success:true,
        data:{
            newProduct
        },
    })
})

exports.updateProduct= asyncCatch( async (req,res,next) => {

    const id = req.params.id

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
        new:true
    })

    if (!updateProduct) return next(new GlobalError("Invalid Id: UPDATE",404))

    res.status(201).json({
        success:true,
        data:{
            updateProduct
        },
    })
})

exports.deleteProduct= asyncCatch( async (req,res,next) => {

    const id = req.params.id

    const deleteProduct = await Product.findByIdAndRemove(id)

    if (!deleteProduct) return next(new GlobalError("Invalid Id: DELETE",404))

    res.status(201).json({
        success:true,
        data:{
            deleteProduct
        },
    }) 
})


exports.searchProducts = asyncCatch(async (req, res, next) => {
  const products = await Product.find({
    name: { $regex: req.query.name, $options: "i" },
  });

  res.status(200).json({
    succes: true,
    length: products.length,
    data: {
      products,
    },
  });
});


