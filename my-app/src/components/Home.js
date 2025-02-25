//imported styling from app.css
import React from "react"; 
import "../App.css";

const Home =() => {
    //shows whatever is in the return block on the home page
    return (
        <div className="home">
            <h1>Jay's Cusine</h1>
            <p>Mondern Cantonese Cusine and Irish food, world-class mixology and beautiful scenery</p>
            <p>In the heart of ennis, One of Clare's biggest restaurant.</p>

            <div className="resDiv">
            <h2><a href="/reservations" className="resLink">Reservation</a></h2>         
            </div>
        </div>
    );
};

export default Home;