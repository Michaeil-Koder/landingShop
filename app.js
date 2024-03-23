const exprees=require("express")
require("dotenv").config()
server=exprees()
const cors=require("cors")

// middleware
server.use(cors())

server.get("/",(req,res)=>{
    res.send("hellow")
})

server.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})