const mongoose = require('mongoose');
// const validator = require('validator')

const productSchema=mongoose.Schema({
        name:{
            type:String,
            required:[true, "Product name must be defined!"],
            unique: true,
            trim:true,
            minLength:[3, "Product name must be at leats 3 characters!"],
            maxLength:[25, "Product name must not exceed 25 characters!"]
        },
        price:{
            type:Number,
            required:[true, "Product price must be defined!"]
        },
        description:{
            type:String
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
        assets: [
          {
            type: {
              url: String,
              publicId: String,
            },
            required: [true, "Assets array is required."],
          },
        ],
        sku:String,
        category:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"category",
            required:[true,"Category id must be defined!"]
        }],
        ratingsAverage: {
            type: Number,
            default: 4.5,
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    {timestamps:true}
)

// productSchema.virtual("image").get(function () {
//   return this.assets[0];
// });

productSchema.virtual("reviews", {
    ref: "review",
    foreignField: "product",
    localField: "_id",
  });

const Product=mongoose.model("product",productSchema)

module.exports=Product