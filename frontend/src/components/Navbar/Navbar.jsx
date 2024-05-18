import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios'; // Import axios
import { assets } from '../../assets/assets.js';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); 
    const { url, getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchTerm.trim() !== '') {
                    const response = await axios.get(`${url}/api/food/search?search=${searchTerm}`);
                    const data = response.data.data;
                    setSuggestions(data);
                    setShowDropdown(true); 
                } else {
                    setSuggestions([]);
                    setShowDropdown(false); 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [searchTerm]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false); // Hide dropdown when clicking outside the dropdown
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    
    useEffect(() => {
        setShowDropdown(false); 
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    // Redirecting to search page
    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/search?search=${searchTerm}`);
        }
    };

    // Clicking on the item will redirect to the product detail page
    const handleSuggestionClick = (id) => {
        navigate(`/food/${id}`); 
    };    

    // Enter to search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='navbar'>
            <Link to=''><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search" ref={dropdownRef}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setShowDropdown(true)} 
                    />
                    {showDropdown && suggestions.length > 0 && (
                        <div className="suggestions-dropdown">
                            {suggestions.map((product, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(product._id)}
                                >
                                    <img className='img' src={url + "/images/"+ product.image} alt={product.name} /> 
                                    <span className='name'>{product.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={handleSearch}><img className='search-icon' src={assets.search_icon} alt="" /></button>
                </div>
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" className="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={() => navigate('/profile')}><img src={assets.info_icon} alt="" /><p>Profile</p></li>
                            <hr />
                            <li onClick={logout}><img  src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
};

export default Navbar;
