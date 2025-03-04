import React, { useState } from "react";
//importing usenavigate navigation tool 
//used for redirection
import { useNavigate } from "react-router-dom";

const AccountLogin = () => {
    //variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");    
    const [emailExists, setEmailExists] = useState(null); 
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState(false);
    const navigate = useNavigate();

    const handleEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError(true);
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
        <div className="login-container">
            <h1 className="login-title">Account Login</h1>

            <div className="input-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                {emailError && <p className="error-message">Please enter a valid email address.</p>}
            </div>

            <button onClick={handleEmail} className="btn">
                Login or Register
            </button>

            {emailExists === false && <p className="error-message">Email not found. Redirecting to Register...</p>}

            {emailExists === true && (
                <>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>

                    <button onClick={handleLogin} className="btn">
                        Login
                    </button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </>
            )}
        </div>
    );
};

export default AccountLogin;
