import React, { useContext, useEffect, useState } from 'react'
import './Food.css'
import { StoreContext } from '../../context/StoreContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Food = () => {

    const { id } = useParams();
    const {cartItems, addToCart, removeFromCart, url, food_list} = useContext(StoreContext);
    const [data, setData] = useState([]);

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

  return (
    <div className='food'>
        <div className="container">
            <img className="food-item-image" src={url + "/images/"+ data.image} alt="" />
            <p>{data.name}</p>
            <p>{data.category}</p>
            <p>{data.description}</p>
            <p>{data.price}</p>
        </div>
    </div>
  )
}

export default Food
