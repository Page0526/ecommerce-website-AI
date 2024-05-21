import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

// Thu Thảo
// Tạo context để chia sẻ trạng thái giữa các component
const StoreContextProvider = (props) => {

    // Khởi tạo state để lưu trữ thông tin giỏ hàng, URL API, token, danh sách món ăn, và tên người dùng
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])
    const [name, setName] = useState("");

    // Hàm thêm món vào giỏ hàng
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
        }
    }

    // Hàm xóa món khỏi giỏ hàng
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", {itemId}, {headers: {token}})
        }
    }

    // Hàm tính tổng số tiền trong giỏ hàng
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) { 
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    
    // Hàm lấy danh sách món ăn từ API
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    // Hàm tải dữ liệu giỏ hàng từ API khi có token
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers: {token}});
        setCartItems(response.data.cartData);
    }

    // useEffect để tải dữ liệu
    useEffect(()=> {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token") ) {
                setToken(localStorage.getItem("token"));
                setName(localStorage.getItem("name"));
                console.log()
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    // Giá trị của context để truyền xuống các component con
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        name
    }

    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider >
    )
}

export default StoreContextProvider;