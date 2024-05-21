// Phương Trang, Thu Thảo, Phạm Chiến
// Controllers food nhận yêu cầu HTTP từ routes food để xử lý các logic liên quan đến food
import foodModel from "../models/foodModel.js";
import fs from 'fs'

// Thêm food
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true, message:'Food Added'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

// danh sách tất cả food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch(error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    } 
}

// xóa food
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:'Food Removed'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}

// lấy ra sản phẩm bằng id
const getFoodById = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id); 
        res.json({success:true, data:food})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error'});
    }
};

// thêm đánh giá
const addComment = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);

        food.ratings.push({
            userId: req.body.userId,
            comment: req.body.comment,
            rating: req.body.rating,
        });
        
        await food.save();
        res.json({success:true, message:"Added comment"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }  
}

// Tìm kiếm sản phẩm
const searchFood = async (req, res) => {
    try {
        const search = req.query.search || "";
        const foods = await foodModel.find({ name: { $regex: search, $options: "i" } });
        res.json({ success: true, message: "Searched", data: foods });
    } catch (error) {
        console.error("Error searching for food:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

// Lấy ra sản phẩm bằng tên
const getFoodByName = async (req, res) => {
    try {
        const food = await foodModel.findOne({name: req.query.name});

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, message: "Get food by name successful.", data: food });
    } catch (error) {
        console.error("Error fetching food by name:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export {addFood, listFood, removeFood, getFoodById, addComment, searchFood, getFoodByName} 