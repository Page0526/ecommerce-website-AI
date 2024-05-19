import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    const handleRatingClick = (orderId, items) => {
        navigate(`/rating/${orderId}`, { state: { items } }); 
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    // Kiểm tra trạng thái rated của đơn hàng
                    const isRated = order.rated === true;

                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.Quantity;
                                } else {
                                    return item.name + " x " + item.Quantity + ", ";
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            {order.status === 'Delivered' && (
                                order.rated ? (
                                    <div className="complete-box">Completed</div>
                                ) : (
                                    <button onClick={() => handleRatingClick(order._id, order.items)} className={order.rated ? 'rated' : ''}>Rating</button>
                                )
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
