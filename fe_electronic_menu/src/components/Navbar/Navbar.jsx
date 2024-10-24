import React, { useContext, useState } from "react";
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useTranslation } from 'react-i18next';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt="Logo" className="logo" />
            </Link>
            {/* <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                <li><Link to='/' onClick={() => { setMenu("home"); setMenuOpen(false); }} className={menu === "home" ? "active" : ""}>{t('home')}</Link></li>
                <li><Link to='/#explore-menu' onClick={() => { setMenu("menu"); setMenuOpen(false); }} className={menu === "menu" ? "active" : ""}>{t('menu')}</Link></li>
                <li><Link to='/#app-download' onClick={() => { setMenu("mobile-app"); setMenuOpen(false); }} className={menu === "mobile-app" ? "active" : ""}>{t('mobile_app')}</Link></li>
                <li><Link to='/#footer' onClick={() => { setMenu("contact-us"); setMenuOpen(false); }} className={menu === "contact-us" ? "active" : ""}>{t('contact_us')}</Link></li>
            </ul> */}
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Icon" />
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Cart Icon" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {/* {!token ?  */}
                 {/* <button onClick={() => setShowLogin(true)}>{t('sign_in')}</button> :  */}
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile Icon" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt="Orders" />
                                <p>{t('orders')}</p>
                            </li>
                            <hr />
                            {/* <li onClick={logout}>
                                <img src={assets.logout_icon} alt="Logout" />
                                <p>{t('logout')}</p>
                            </li> */}
                        </ul>
                    </div>
                 {/* } */}
                <div className="language-switcher">
                    <button className="lang-btn" onClick={() => changeLanguage('en')}>EN</button>
                    <button className="lang-btn" onClick={() => changeLanguage('vi')}>VI</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
