import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Phương Trang
// khai báo App function component không nhận tham số nào
const App=() => {
  // gốc của api mà các component con sẽ sử dụng
  const url='http://localhost:4000'
  // trả về 1 đoạn jsx để tạo cấu trúc giao diện
  return (
    <div>
      <ToastContainer/>
      {/* Thanh điều hướng */}
      <Navbar/>
      <hr/>
      <div className="app-content">
        {/* Thanh bên */}
        <Sidebar/>
        <Routes>
          {/* Nút điều hướng đến trang thêm sản phẩm */}
          <Route path ='/add' element={<Add url={url}/>}/>
          {/* Nút điều hướng đến trang hiển thị danh sách sản phẩm */}
          <Route path ='/list' element={<List url={url}/>}/>
          {/* Nút điều hướng đến trang danh sách đơn hàng */}
          <Route path ='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div> 
    </div>
  )
}

// export để sử dụng ở chỗ khác
export default App