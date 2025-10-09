export const errorHandler = (err,req,res,next)=>{
    console.log(err.stack)

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
console.log('message')
    res.status(statusCode).json({
        success:false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
         
        //spread operator(...)If the condition is true, merge { stack: err.stack } into the object.
    })
}