const mongoose = require("mongoose");
require("dotenv").config({ path: "../config.env" });
const fs = require("fs");
const Product = require("../model/product");
const { dirname } = require("path");

//! MongoDB connection
const PORT = process.env.PORT || 5000;

const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, (err) => {
  if (err) return console.log(err);

  console.log("MongoDb connected");

  const products = JSON.parse(fs.readFileSync(`${__dirname}/../products-data.json`));

  async function importData() {
    try {
      await Product.create(products);
      console.log("Data imported!");
    } catch (error) {
      console.log(error);
    }

    process.exit();
  }

  async function deleteData() {
    try {
      await Product.deleteMany();
      console.log("Data deleted");
    } catch (error) {
      console.log(error);
    }

    process.exit();
  }

  if (process.argv[2] === "import") {
    importData();
  } else if (process.argv[2] === "delete") {
    deleteData();
  }
});