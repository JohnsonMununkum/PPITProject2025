//importing usenavigate for direction, ude state to store data to specific variables
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Reservation= () =>{
    //variables
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

     //time slots
     const timeSlots = ['6:00 PM', '7:00 PM', '8:00 PM'];

    //check if user is logged in if not direct them to the login page
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setMessage('You must be logged in to make a reservation');
        setIsError(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }
}, [navigate]);
};

export default Reservation;