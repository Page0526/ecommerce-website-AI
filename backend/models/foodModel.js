// Phương Trang
// Định nghĩa cấu trúc bảng food trong cơ sở dữ liệu
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},   
    image: {type:String, required:true},
    category: {type:String, required:true},
    ratings: [{ 
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true }
    }]
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel;
