import React, { useState } from "react";
import "../App.css";

const Menu = () => {
    const [activeMenu, setActiveMenu] = useState("lunch"); // Default view

    return (
            <div className="menu">
                <div className="menu-options">
                    <button className={`menubtn ${activeMenu === "lunch" ? "active" : ""}`} onClick={() => setActiveMenu("lunch")}>Lunch</button>
                    <button  className={`menubtn ${activeMenu === "evening" ? "active" : ""}`}  onClick={() => setActiveMenu("evening")}>Evening Menu</button>
                    <button  className={`menubtn ${activeMenu === "drinks" ? "active" : ""}`}  onClick={() => setActiveMenu("drinks")}>Drinks</button>
                </div>
            </div>
    );
};

export default Menu;
