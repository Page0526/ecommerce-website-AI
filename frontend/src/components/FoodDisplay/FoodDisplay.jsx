import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'

// Đõ Trang
// Component FoodDisplay để hiển thị danh sách các món ăn
const FoodDisplay = ({ category }) => {

  // Sử dụng useContext để lấy danh sách món ăn từ StoreContext
  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          // Hiển thị món ăn nếu danh mục là "All" hoặc khớp với danh mục của món ăn
            if(category==="All" || category===item.category) {
              // Trả về component FoodItem cho mỗi món ăn phù hợp
              return <FoodItem 
                key={index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
                ratings={item.ratings} 
                />
            }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
