const exprees=require("express")
require("dotenv").config()
const server=exprees()
const cors=require("cors")
server.use(exprees.json())
server.use(exprees.urlencoded({extended:false}))
// middleware
server.use(cors())

// require Routes
const userRoutes=require("./routes/userRoutes")

// Routes

server.use("/user",userRoutes)


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