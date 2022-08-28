const mongoose = require('mongoose');

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name must be defined"]
    },
    price:{
        type:Number,
        required:[true, "Product price must be defined!"]
    },
    size:{
        type:[String],
        required:[true, "Product price must be defined!"]
    },
    colors:{
        type:[String],
        required:[true, "Product colors must be defined!"]
    },
    images:{
        type:[String]
    },
    imageCover:{
        type:String,
        required:[true, "Product image must be defined!"]
    }
})

const Product=mongoose.model("product",productSchema)

module.exports=Product