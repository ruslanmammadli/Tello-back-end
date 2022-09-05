const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config({path:"./config.env"})
const errorHandler=require("./error/errorHandler")
const GlobalError=require("./error/GlobalError")

const productRouter=require("./routes/productRouter")

//! Initilizing the App:
const app = express()

//! Build in Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json())


//!Routes
app.use("/api/v1/products",productRouter);

app.use((req,res,next) => {
    const message = new GlobalError(`The ${req.originalUrl} does not exists!`)
    next(message)
})

app.use(errorHandler)

//! MongoDB connection
const PORT = process.env.PORT || 5000;
const DB=process.env.DB_URL.replace("<password>",process.env.DB_PASSWORD)
mongoose.connect(DB,(err)=>{
    if(err) return console.log(err);

    console.log("MongoDb connected");

    //! Running the server
    app.listen(PORT, () => console.log(`Server running in PORT: ${PORT}`))
})