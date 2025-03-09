import {useState}  from "react";
// axios sends the user reg data to my sever.js(backend)
import axios from "axios";
// use navigate for navigation
import { useNavigate } from "react-router-dom";


//useState to hold the data of these variables
const Register = () => {
    //variables
    const [fname, setFname] = useState("");
    const [sname, setSname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

   
    const handleRegister = async (e) => {
        e.preventDefault();

        // have to enter all inputs required
        if (!fname || !sname || !email || !password || phoneNum) {
            setError("All fields are required");
            return;
        }

        // used correct email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
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


};

export default Register;
