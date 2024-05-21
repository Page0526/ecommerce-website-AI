import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

// Phương Trang
// Thanh điều hướng của trang admin
const Navbar = () => {
    //  render giao diện cho thanh điều hướng
    return (
        <div className='navbar'>
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    )
}

console.log(assets.logo)
export default Navbar