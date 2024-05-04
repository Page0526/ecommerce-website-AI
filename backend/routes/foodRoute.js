import express from 'express'
import { addFood, listFood, removeFood, getFoodById } from '../controllers/foodController.js'
import authMiddleware from "../middleware/auth.js"
import multer from 'multer'


const foodRouter = express.Router();

// Image Storage Engine: where to storage food image
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`) // use this method, our filename will become unique
    }
}) 

const upload = multer({storage: storage})

// modify router
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood);
foodRouter.get('/:id', getFoodById);




export default foodRouter;
