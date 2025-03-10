import React, {useState}  from "react";
// axios sends the user reg data to my sever.js(backend)
import axios from "axios";
// use navigate for navigation
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";


//useState to hold the data of these variables
const Register = () => {
    //variables
    const [fname, setFname] = useState("");
    const [sname, setSname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

   
    const handleRegister = async (e) => {
        e.preventDefault();

        // have to enter all inputs required
        if (!fname || !sname || !email || !password || !confirmPassword  || !phoneNum || !dob) {
            setError("All fields are required");
            return;
        }

        // used correct email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        //checking if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

         // send registration data to backend using Axios
        try {
            const res = await axios.post("http://localhost:4000/register", {
                fname,
                sname,
                email,
                password,
                phoneNum
            });

            setMessage(res.data.message); // Display success message

        // Save user details to localStorage 
        const userDetails = { fname, sname, email, password, phoneNum };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        setError("");

        // Redirect to login page
        console.log("Registration successful! Please log in.");
        navigate("/"); 
        //if sending data back didnt go to plan 
    } catch (err) {
        setError("Something went wrong");
    }
    };

    return(
        <div className="page-container">
            <div className="reg-container">
                <div className="content-wrap">
    
                    <h1 className="reg-title">Customer Registration</h1>
    
                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            className="input-field"
                        />
    
                        <label>Surname:</label>
                        <input
                            type="text"
                            value={sname}
                            onChange={(e) => setSname(e.target.value)}
                            className="input-field"
                        />
    
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
    
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
    
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                        />
    
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            className="input-field"
                        />
    
                        <label>Date Of Birth:</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={handleRegister} className="btn">
                        Register
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
    
};

export default Register;
