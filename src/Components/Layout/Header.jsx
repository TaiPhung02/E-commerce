import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "../../App.css";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";

import SearchPage from "./Search";

function Header() {
    const [sidebar, setSidebar] = useState(false);
    const showSideBar = () => setSidebar(!sidebar);

    const { cart } = useSelector((state) => state.allCart);

    const handleLogout = () => {
        localStorage.clear();
    };

    var username = localStorage.getItem("user");
    username = JSON.parse(username);

    return (
        <>
            <IconContext.Provider value={{ color: "undefined" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                    <SearchPage></SearchPage>
                    <div>
                        <span className="menu-bars">
                            <i className="fa-solid fa-user"></i> Hi, {username}
                        </span>
                        <Link
                            to="/login"
                            className="menu-bars"
                            onClick={() => handleLogout()}
                        >
                            <i className="fa-solid fa-right-from-bracket"></i>{" "}
                            Logout
                        </Link>
                    </div>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSideBar}>
                        <li className="navbar-menu-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <li className="nav-text">
                            <Link to="/">
                                <AiIcons.AiFillHome />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="nav-text">
                            <Link to="/cart">
                                <FaIcons.FaShoppingCart />
                                <span>Cart({cart.length})</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Header;
