const path = require("path")
const multer = require("multer")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === "cover"){
            cb(null, path.join(__dirname, "..", "public", "products", "covers"))
        }else if (file.fieldname === "banner"){
            cb(null, path.join(__dirname, "..", "public", "products", "banners"))
        }
    },
    filename: (req, file, cb) => {
        
        const filename = String(Math.floor(Date.now() + Math.random() * 9999999))
        const ext = path.extname(file.originalname)
        const basename = path.basename(file.originalname, ext)
        cb(null, basename+"_"+ filename + ext)
    },
    fileFilter : (req, file, cb) => {
        const allowedMimeTypesImage = ["image/jpeg", "image/jpg", "image/png"];
        const allowedMimeTypesVideo = ["video/mp4", "video/mkv"];
        if (file.fieldname === "cover") {
            if (!allowedMimeTypesImage.includes(file.mimetype)) {
                return cb(new Error("please upload a Image"))
            }
        }else if (file.fieldname === "banner") {
            if (!allowedMimeTypesVideo.includes(file.mimetype)) {
                return cb(new Error("please upload a banner by type mp4 or mkv"))
            }
        }
        cb(null, true)
    }
})



// const upload = multer({ storage, fileFilter ,limits:{
//     fileSize:200*1024*1024
// }})

module.exports = storage