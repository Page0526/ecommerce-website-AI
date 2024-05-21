import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext.jsx';
import { Link } from 'react-router-dom';

// Đỗ Trang, Thu Thảo
// Component FoodItem để hiển thị thông tin của một món ăn
const FoodItem = ({ id, name, price, description, image, ratings }) => {

    // Sử dụng useContext để lấy các phương thức và trạng thái từ context
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Hàm tính điểm trung bình đánh giá của món ăn
    const calculateAverageRating = (ratings) => {
        if (ratings && ratings.length > 0) {
            const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
            const averageRating = totalRating / ratings.length;
            return averageRating.toFixed(1);
        } else {
            return 0;
        }
    };

    // Gọi hàm để tính điểm trung bình đánh giá
    const averageRating = calculateAverageRating(ratings);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                {/* Link đến trang chi tiết món ăn */}
                <Link to={`/food/${id}`}>
                    <img className="food-item-image" src={url + "/images/" + image} alt="" />
                </Link>
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <Link to={`/food/${id}`}>{name}</Link>
                    <p className='rating-star'><img src={assets.rating_starts} alt="" /><span>{averageRating}</span></p>
                </div>
                <p className="food-item-price">{price}vnd</p>
            </div>
        </div>
    );
};

export default FoodItem;
