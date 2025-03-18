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

                             {/*  Starters */}
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
                                <span className="dish">Chicken Caeser Salad  <span className="price">€9.95(add Bacon +€1)</span></span>
                                <p className="itemsum">Chicken Strips, Cos Lettuce, Garlic Croutons & Fresh Parmesan Shavings, bound in our 
                                Caesar Dressing.</p>
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

                            {/*  Mains */}
                            <h2 className="menu-title">Main</h2>
                            <div className="menu-divider"></div>

                            <div className="menu-item">
                                <span className="dish">Beef Burger<span className="price">€13.50(add Bacon + €1)</span></span>
                                <p className="itemsum">Beef Burger topped with Melted Cheddar Cheese, Homemade Crispy
                                Onion Rings, on a lightly toasted Brioche Bun served with Fries.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Chicken Burger<span className="price">€13.50</span></span>
                                <p className="itemsum">Buttermilk fried Chicken, Applewood Cheese, Lettuce, Red Onion & Tomato served with 
                                Coleslaw & Fries .</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Chicken Goujons<span className="price">€13.50</span></span>
                                <p className="itemsum">Served with Garlic Mayo & Fries.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Bacon & Chicken Carbonara<span className="price">€13.95</span></span>
                                <p className="itemsum">Smoked Bacon & Chicken in a Creamy Garlic Sauce Served
                                with Parmesan Shavings and Garlic Bread.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">8oz Sirloin Steak<span className="price">€22.95</span></span>
                                <p className="itemsum">Cooked to your liking served with a choice of Creamy Peppercorn
                                Sauce or Garlic Butter, accompanied with Sauté Onions & Mushrooms, & Fries.</p>
                            </div>

                            <div className="menu-divider"></div>

                            {/*  Desserts */}
                            <h2 className="menu-title">Dessert</h2>
                            <div className="menu-divider"></div>

                            <div className="menu-item">
                                <span className="dish">Chocolate Brownie<span className="price">€6.95</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Apple Crumble<span className="price">€6.95</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">CheeseCake<span className="price">€6.95</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">IceCream<span className="price">€6.95</span></span>
                            </div>
                        </div>
                     )}
             </div>


             {/* Evening menu */}
             {activeMenu === "evening" && (
                        <div className="menu-section">

                             {/*  Starters */}
                            <h2 className="menu-title">Starters</h2>
                            <div className="menu-divider"></div>

                            <div className="menu-item">
                                <span className="dish">Garlic Bread<span className="price">€5.50(add cheese +€1)</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Nachos<span className="price">€8.95(add Spicy Minced Beef +€2)</span></span>
                                <p className="itemsum"> Irish Cheddar Cheese, Fresh Pepper & Jalapeno Salsa, Guacamole & Tarragon Creme 
                                Fraiche.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Soup of the Day<span className="price">€7.95</span></span>
                                <p className="itemsum">Served with freshly Baked Brown Bread.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Chicken Wings<span className="price">€9.95</span></span>
                                <p className="itemsum"> Coated in a Hickory BBQ sauce or Chefs Hot & Spicy Sauce, served with a Sun Blushed 
                                Tomato Salad, Honey & Mustard Dressing with a side of Blue Cheese Mayo.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Chicken Goujons<span className="price">€9.50</span></span>
                                <p className="itemsum">Served with our House Salad & Garlic Mayo.</p>
                            </div>


                            <div className="menu-divider"></div>

                            {/*  Mains */}
                            <h2 className="menu-title">Main</h2>
                            <div className="menu-divider"></div>

                            <div className="menu-item">
                                <span className="dish">Beef Burger<span className="price">€13.50(add Bacon + €1)</span></span>
                                <p className="itemsum">Beef Burger topped with Melted Cheddar Cheese, Homemade Crispy
                                Onion Rings, on a lightly toasted Brioche Bun served with Fries.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Chicken Curry<span className="price">€16.95</span></span>
                                <p className="itemsum">With Roasted Red Onion, Peppers, Courgette served with
                                Basmati Rice & Naan Bread.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Chicken Goujons<span className="price">€13.50</span></span>
                                <p className="itemsum">Served with Garlic Mayo & Fries.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Beef & Guinnes Stew<span className="price">€16.95</span></span>
                                <p className="itemsum">Served with Creamy Chive Mashed Potatoes.</p>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Fish & Chips<span className="price">€18.50</span></span>
                                <p className="itemsum">Fresh Fillet of Hake in Homemade Beer Batter, served with
                                Mushy Peas, Tartar Sauce & Fries.</p>
                            </div>

                            <div className="menu-divider"></div>

                            {/*  Desserts */}
                            <h2 className="menu-title">Dessert</h2>
                            <div className="menu-divider"></div>

                            <div className="menu-item">
                                <span className="dish">Chocolate Brownie<span className="price">€7.50</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">Apple Crumble<span className="price">€7.50</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">CheeseCake<span className="price">€7.50</span></span>
                            </div>

                            <div className="menu-item">
                                <span className="dish">IceCream<span className="price">€7.50</span></span>
                            </div>
                        </div>
                     )}


        </div>
    );
};

export default Menu;
