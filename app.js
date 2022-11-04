const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config({path:"./config.env"})
const errorHandler=require("./error/errorHandler")
const GlobalError=require("./error/GlobalError")
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

const productRouter=require("./routes/productRouter")
const userRouter=require("./routes/userRouter")
const categoryRouter = require("./routes/categoryRouter");
const reviewRouter=require('./routes/reviewRouter');
const basketRouter=require('./routes/basketRouter')


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Rate limit of 100 is finished"
})

//! Initilizing the App:
const app = express()

//! Build in Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json())
app.use(helmet());

//! Set limit
app.use(limiter)


//!Routes
app.use("/api/v1/products",productRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/basket",basketRouter)

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