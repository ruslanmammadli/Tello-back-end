const Product = require("../model/productSchema")

exports.getAllProducts = async (req,res) => {
    try {
        const products= await Product.find()

        res.json({
            success:true,
            quantity:products.length,
            data:{
                products,
            },
        })
    } catch (error) {
        res.status(404).json({ success: false, message: error });
    }
}

exports.getOneProduct= async (req,res) => {
    try {
        const id = req.params.id
        const oneProduct= await Product.findById(id)

        if (!oneProduct)
        return res.status(404).json({
          success: false,
          message: "Invalid ID",
        });

        res.status(200).json({
            success:true,
            data:{
                oneProduct
            }
        })
    } catch (error) {
        res.status(404).json({ success: false, message: error });
    }
}