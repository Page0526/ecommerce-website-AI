import React, { useContext, useEffect, useState } from 'react';
import './Food.css';
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';

// arrow function
const Food = () => {
    const { id } = useParams();
    const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [recommendations, setRecommendations] = useState([]);

    const fetchFood = async () => {
        const response = await axios.get(url + `/api/food/${id}`);
        if (response.data.success) {
            setData(response.data.data);
            calAverageRating(response.data.data.ratings);
            fetchRecommendations(response.data.data.name);
        } else {
            console.log("Error");
        }
    };

    const fetchRecommendations = async (itemName) => {
        try {
            const response = await axios.get(`http://localhost:4040/recommend/${itemName}`);
            if (response.status === 200) {
                setRecommendations(response.data.recommendations);
            } else {
                console.log("Error fetching recommendations");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        fetchFood();
    }, []);

    const calAverageRating = (ratings) => {
        if (ratings && ratings.length > 0) {
            const totalRating = ratings.reduce((acc, rating) => acc + parseInt(rating.rating), 0);
            const avgRating = (totalRating / ratings.length).toFixed(1);
            setAverageRating(avgRating);
        } else {
            setAverageRating(0);
        }
    };

    const renderStarRating = () => {
        const stars = [];
        const roundedAverage = Math.round(averageRating);
        const integerPart = Math.floor(averageRating);
        const decimalPart = averageRating - integerPart;

        for (let i = 1; i <= integerPart; i++) {
            stars.push(<span key={i} className="star filled">&#9733;</span>);
        }

        if (decimalPart > 0 && decimalPart < 1) {
            stars.push(<span key="half-star" className="half-filled">&#9733;</span>);
        }

        for (let i = stars.length + 1; i <= 5; i++) {
            stars.push(<span key={i} className="star">&#9733;</span>);
        }

        return stars;
    };

    return (
        <div className='food'>
            <div className="container">
                <img className="food-item-img" src={url + "/images/"+ data.image} alt="" />
                <div className="descrip">
                    <p className="name">{data.name}</p>
                    <p className="price">{data.price}vnd</p>
                    <p className='description-title'>Description:</p>
                    <p className="description">{data.description}</p>
                    <p className="category">Catogory: {data.category}</p>
                    <div className="rate">
                        <p>{averageRating}</p>
                        <div className="star">{renderStarRating()}</div>
                    </div>
                    {!cartItems[data._id]
                        ? <button className="add-button" onClick={() => addToCart(data._id)}>Add to cart</button>
                        : <div className='food-item-counters'>
                            <img onClick={() => removeFromCart(data._id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[data._id]}</p>
                            <img onClick={() => addToCart(data._id)} src={assets.add_icon_green} alt="" />
                        </div>
                    }
                </div>
                <div className='box-rating'>
                    <h2>Ratings:</h2>
                    <div className="comment-container">
                        {data.ratings && data.ratings.length > 0 ? (
                            <ul>
                                {data.ratings.map((rating, index) => (
                                    <li key={index} className='rating-item'>
                                        <p>User ID: <span>{rating.userId}</span></p>
                                        <p>Comment: <span>{rating.comment}</span></p>
                                        <p>Rating: <span id='rating-number'>{rating.rating}<img src={assets.rating_starts}/></span></p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No ratings</p>
                        )}
                    </div>
                </div>
                <div className="recommend-item">
                    <h2>Recommend food for you</h2>
                    <hr />
                    <div className="recommend-list">
                        {recommendations.length > 0 ? (
                            <ul>
                                {recommendations.map((item, index) => (
                                    <li key={index} className='recommendation-item'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No recommendations available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Food
