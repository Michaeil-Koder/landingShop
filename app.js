const exprees=require("express")
require("dotenv").config()
const server=exprees()
const cors=require("cors")
const cookieParser = require('cookie-parser');


server.use(exprees.json())
server.use(exprees.urlencoded({extended:false}))
// middleware
server.use(cors())
server.use(cookieParser())
server.use(exprees.static("./views"))
server.use(exprees.static("./public"))

// require Routes
const userRoutes=require("./routes/userRoutes")
const banRoutes=require("./routes/banRoutes")
const productRoutes=require("./routes/productRoutes")
const pageRoutes=require("./routes/pageRoutes")
const sizeRoutes=require("./routes/sizeRoutes")

// main route
server.use("/",pageRoutes)

// Routes

server.use("/landing/user",userRoutes)
server.use("/landing/ban",banRoutes)
server.use("/landing/product",productRoutes)
server.use("/landing/size",sizeRoutes)


// error Handller
server.use((err,req,res,next)=>{
    return res.status(err.status || 400).send({
        status:err.status || 400,
        statusMessage:err.message || "Server Error"
    })
})


server.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})