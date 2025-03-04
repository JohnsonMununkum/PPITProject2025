import React, { useState } from "react";
//importing usenavigate navigation tool 
//used for redirection
import { useNavigate } from "react-router-dom";

const AccountLogin = () => {
    //variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");    
    const [emailExists, setEmailExists] = useState(null); 
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        console.log("Email Sent to Backend:", email);

        const response = await fetch("http://localhost:4000/AccountLogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
    
        const data = await response.json();
        console.log("Response from Backend:", data);
        
        if (data.exists) {
            setEmailExists(true);
        } else {
            setEmailExists(false);
            navigate("/register");
        }
    };
    
    const handleLogin = async () => {
        //validation for password
        if (!password) {
            setPasswordError("Password is required.");
            return;
        }

        const response = await fetch("http://localhost:4000/AccountLogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (data.success) {
            console.log("Login Successful");
            navigate("/");
        } else {
            setPasswordError("Incorrect password. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "130px" }}>
        <h1>Account Login</h1>

        {/* Email Input */}
        <label>Email:</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", width: "250px", margin: "10px" }}
        />
        <br />
        <button onClick={handleEmail} style={{ padding: "10px 20px" }}>
            Login or Register
        </button>

        {/* If Email is Not Found, Redirect */}
        {emailExists === false && (
            <p style={{ color: "red" }}>Email not found. Redirecting to Register...</p>
        )}

        {/* If Email Exists, Show Password Field */}
        {emailExists === true && (
            <>
                <br />
                <label>Pawword:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: "10px", width: "250px", margin: "10px" }}
                />
                <br />
                <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
                    Login
                </button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </>
        )}
    </div>
    );
};

export default AccountLogin;
