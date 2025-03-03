import React from "react";
//importing usenavigate navigation tool 
//used for redirection
import { useNavigate } from "react-router-dom";

const AccountLogin = () => {
    //variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [emailExists, setEmailExists] = useState(null); 
    const navigate = useNavigate();

    return (
        <div style={{ marginTop: "120px" }}>
            <h1>Account Login Page</h1>
        </div>
    );
};

export default AccountLogin;
