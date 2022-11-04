const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsjl2mda1",
  api_key: "275814644372437",
  api_secret: "A7PdoOP8lKq6atZoJGyUtrYG2Wc",
  secure: true,
});

module.exports = cloudinary;