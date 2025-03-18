import React, { useState } from "react";
import "../App.css";

const Menu = () => {
    //defualt view menu starts on the lunch page
    const [activeMenu, setActiveMenu] = useState("lunch");

    return (
            <div className="menu">
                <div className="menu-options">
                    <button className={`menubtn ${activeMenu === "lunch" ? "active" : ""}`} onClick={() => setActiveMenu("lunch")}>Lunch</button>
                    <button  className={`menubtn ${activeMenu === "evening" ? "active" : ""}`}  onClick={() => setActiveMenu("evening")}>Evening Menu</button>
                    <button  className={`menubtn ${activeMenu === "drinks" ? "active" : ""}`}  onClick={() => setActiveMenu("drinks")}>Drinks</button>
                </div>

                <div className="menu-content">
                    {activeMenu === "lunch" && (
                        <div className="menu-section">
                            <h2 className="menu-title">Starters</h2>
                            <div className="menu-divider"></div>

                            <div className="menu-item">
                                <span className="dish">Chicken Wings <span className="price">€9.50</span></span>
                                <p className="itemsum">Coated in a Hickory BBQ sauce or Chefs Hot & Spicy Sauce, served with a Sun Blushed 
                                Tomato Salad, Honey & Mustard Dressing with a side of Blue Cheese Mayo.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Goats Cheese <span className="price">€9.50</span></span>
                                <p className="itemsum">Goats Cheese & Carmelised Red Onion served in a Crispy Puff Pastry Tartlet served with 
                                Pesto and Walnut Dressed House Salad.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish"> Chicken Caeser Salad  <span className="price">€9.95</span></span>
                                <p className="itemsum">Chicken Strips, Cos Lettuce, Garlic Croutons & Fresh Parmesan Shavings, bound in our 
                                Caesar Dressing (add Bacon +€1).</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Toasted Special<span className="price">€9.95</span></span>
                                <p className="itemsum">Freshly toasted sandwich on a White or Brown Hearty Sourdough Bread, with choice of 
                                Ham, Chicken, Tomato, Red Onion & Irish Cheddar & Fries.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">BLT<span className="price">€10.95</span></span>
                                <p className="itemsum"> Smoked Bacon, Baby Gem Lettuce & Tomato, served in a Toasted Sourdough Bread with 
                                Mayonnaise & Fries.</p>
                            </div>


                            <div className="menu-divider"></div>

                           
                        </div>
                     )}
             </div>

        </div>
    );
};

export default Menu;
