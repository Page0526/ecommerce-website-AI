import React, { useContext, useEffect, useState } from 'react'
import './Food.css'
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Food = () => {

    const { id } = useParams();
    const {cartItems, addToCart, removeFromCart, url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [rating, setRating] = useState({
        comment: "",
        rate: "",
    });

    const fetchFood = async () => {
        const response = await axios.get(url + `/api/food/${id}`);
        if (response.data.success) {
            setData(response.data.data);
        } else {
            console.log("Error")
        }
    }

    useEffect (() => {
        fetchFood()
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRating (rating => ({...rating, [name]: value}))
    }

    const comment = async (event) => {
        event.preventDefault();

        let ratingData = {
            comment: rating.comment,
            rating: rating.rate
        }

        let response = await axios.post(url + `/api/food/${id}`, ratingData, {headers: {token}});
        if (response.data.success) {
            fetchFood()
        } else {
            console.log("Error")
        }
    }

  return (
    <div className='food'>
        <div className="container">
            <img className="food-item-image" src={url + "/images/"+ data.image} alt="" />
            <p>{data.name}</p>
            <p>{data.category}</p>
            <p>{data.description}</p>
            <p>{data.price}</p>
        </div>
        <br />
        <br />
        <div>
            <h4>Ratings:</h4>
            {data.ratings && Object.keys(data.ratings).length > 0 ? (
                <ul>
                    {data.ratings.map((rating, index) => (
                        <li key={index}>
                            <p>User ID: {rating.userId}</p>
                            <p>Comment: {rating.comment}</p>
                            <p>Rating: {rating.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No ratings available</p>
            )}
        </div>
        <form onSubmit={comment} className='place-order'>
            <div className="place-order-left">
                <p className="title">Comment</p>
                <div className="multi-fields">
                <input required name='comment' onChange={ onChangeHandler } value={ rating.comment } type="text" placeholder='comment' />
                <input required name='rate' onChange={ onChangeHandler } value={ rating.rate } type="number" placeholder='rate' />
                </div>
                <button type='submit'>Comment</button>
            </div>
        </form>
    </div>
  )
}

export default Food
