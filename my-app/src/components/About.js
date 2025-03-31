//imported styling from app.css
import React from "react"; 
import "../App.css";
import Footer from "./Footer";

const Home =() => {
    //shows whatever is in the return block on the home page
    return (
        <div className="about">
              <div className="about-container">
                <p>
                    Jay's Cuisine is a beloved Irish restaurant nestled in the heart of Ennis. 
                    We take pride in serving fresh, mouth-watering meals all day long. 
                    Start your day with our delightful lunch menu, then join us in the evening for our acclaimed dinner selections. 
                    Whether you're in the mood for a handcrafted cocktail, a fine spirit, or a refreshing non-alcoholic beverage, we've got something for every taste. 
                    Come and experience our warm, welcoming atmosphere and let us treat you to a truly memorable dining experience!
                </p>

                
            </div>

            <Footer/>
        </div>
    );
};

export default Home;