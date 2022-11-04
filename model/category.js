const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Category name is required!"],
    },
    slug: {
      type: String,
      required: [true, "Category name is required!"],
      unique: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    photo:String,
    photoId:String,
    // countOfProducts:{
    //     type:Number,
    //     default:0
    // },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;