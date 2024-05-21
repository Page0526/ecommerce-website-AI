// Phương Trang
// Định nghĩa các routes cho food
import express from 'express'
import { addFood, listFood, removeFood, getFoodById, addComment, searchFood, getFoodByName } from '../controllers/foodController.js'
import authMiddleware from "../middleware/auth.js"
import multer from 'multer'


const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`) // sử dụng phương thức này để file là duy nhất
    }
}) 

const upload = multer({storage: storage})

foodRouter.get("/get", getFoodByName)
foodRouter.get("/search", searchFood);
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood);
foodRouter.get('/:id', getFoodById);
foodRouter.post("/:id", authMiddleware, addComment)

export default foodRouter;
