const mongoose = require('mongoose');


const productSchema=mongoose.Schema({
        name:{
            type:String,
            required:[true, "Product name must be defined!"],
            unique: true,
            trim:true,
            minLength:[3, "Product name must be at leats 3 characters!"],
            maxLength:[30, "Product name must not exceed 15 characters!"]
        },
        price:{
            type:Number,
            required:[true, "Product price must be defined!"]
        },
        // discount:{
        //     type:Number,
        //     validate:{
        //         validator: function(doc){
        //             return this.price > doc
        //         },
        //         message: `Discount of {VALUE} must not exceed the price`
        //     }
        // },
        size:{
            type:[String],
            required:[true, "Product size must be defined!"],
            enum:{
                values: ["64GB","128GB","256GB","512GB"],
                message: "Size can only be: 64GB, 128GB, 256GB, 512GB!"
            }
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
        },
    },
    {timestamps:true}
)


const Product=mongoose.model("product",productSchema)

module.exports=Product