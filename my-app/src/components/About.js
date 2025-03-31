//imported styling from app.css
import React from "react"; 
import "../App.css";
import Footer from "./Footer";

const Home =() => {
    //shows whatever is in the return block on the home page
    return (
        <div className="about">
            <Footer/>
        </div>
    );
};

export default Home;