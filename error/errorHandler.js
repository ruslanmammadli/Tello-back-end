const GlobalError = require("./GlobalError")

function sendDevError(err,req,res,statusCode){
    res.status(statusCode).json({
        message: err.message,
        error:err,
        code:statusCode,
        stack:err.stack
    })
}
function sendProdError(err,req,res){
    if(err.Operational){
        res.status(500).json({
            success:false,
            mesage: err.message
        })
    }else{
        res.json({
            success:false,
            mesage: "Ops!, Something went wrong.."
        })
    }
}


const handlerDuplicateError = (err) => {
    return new GlobalError("This valuse must be unique!",400)
}

const handlerCastError = (err) => {
    return new GlobalError("Id must be Object id type!",400)
}

const handleValidationError = (err) => {
   const er = Object.values(err.errors).join(";")
    return new GlobalError(er)
}

const handleTokenExpire = (err) =>{
    return new GlobalError("Session time out. Please Log in again", 403)
}

const handleTokenError = (err) =>{
    return new GlobalError("Invalid Token", 403)
}

module.exports=(err,req,res,next)=>{
    const statusCode=err.statusCode || 500; 

    if (process.env.NODE_ENV === "development") {
        sendDevError(err,req,res,statusCode)
    
    }else if(process.env.NODE_ENV === "production"){

        if (err.code === 11000) err = handlerDuplicateError(err);    
        else if (err.name === "CastError") err = handlerCastError(err); 
        else if (err.name === "ValidationError") err = handleValidationError(err);
        else if (err.name === "TokenExpireError") err = handleTokenExpire(err);
        else if (err.name === "JsonWebError") err = handleTokenError(err);

        sendProdError(err, req, res);
    }
}