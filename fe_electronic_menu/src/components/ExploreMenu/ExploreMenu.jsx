import React, { useState, useEffect, useRef } from "react";
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const menuRef = useRef(null);  // Sử dụng ref để thao tác với danh sách menu
    let touchStartX = 0;
    let touchEndX = 0;

    useEffect(() => {
        const fetchMenuList = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMenuList(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchMenuList();
    }, []);

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
        const moveX = touchStartX - touchEndX;

        // Di chuyển danh sách khi lướt
        menuRef.current.scrollLeft += moveX;
        touchStartX = touchEndX;  
    };

    if (loading) {
        return (
            <div className='explore-menu' id='explore-menu'>
                <h1> Explore our Menu</h1>
                <p className="explore-menu-text">Choose from a diverse menu featuring a delectable ...</p>
                <p>Loading...</p>
                <hr />
            </div>
        );
    }

    if (error) {
        return (
            <div className='explore-menu' id='explore-menu'>
                <h1> Explore our Menu</h1>
                <p className="explore-menu-text">Choose from a diverse menu featuring a delectable ...</p>
                <p>Error loading menu</p>
                <hr />
            </div>
        );
    }

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1> Explore our Menu</h1>
            <p className="explore-menu-text">Choose from a diverse menu featuring a delectable ...</p>
            <div 
                className="explore-menu-list" 
                ref={menuRef} 
                onTouchStart={handleTouchStart} 
                onTouchMove={handleTouchMove}  // Lắng nghe sự kiện lướt
            >
                {menuList.map((item) => (
                    <div 
                        onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)} 
                        key={item.id} 
                        className="explore-menu-list-item"
                    >
                        <img 
                            className={category === item.name ? "active" : ""} 
                            src={item.image ? `http://localhost:8080/images/${item.image}` : '/images/default.png'} 
                            alt={item.name} 
                        />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
