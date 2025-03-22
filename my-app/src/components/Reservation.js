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
    const [Error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

     //time slots
     const timeSlots = ['6:00 PM', '7:00 PM', '8:00 PM'];

    //check if user is logged in if not direct them to the login page
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setMessage('You must be logged in to make a reservation');
        setError(true);
        setTimeout(() => {
            navigate('/AccountLogin');
        }, 10);
     }
    }, [navigate]);


    //handling for sub
    const handleReservation = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError(false);

        //user must enter all fields 
        if (!date || !time || !numberOfPeople) {
            setMessage('Please fill in all fields');
            setError(true);
            setIsLoading(false);
            return;
        }

        //the date the user selects must be a date in the future
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            setMessage('Please select a future date');
            setError(true);
            setIsLoading(false);
            return;
        }

        //get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            setMessage('You must be logged in to make a reservation');
            setError(true);
            setIsLoading(false);
            setTimeout(() => {
                navigate('/AccountLogin');
            }, 2000);
            return;
        }

        //try & fetch the reservations
        //if cant work error message should come
        try {
            const response = await fetch('http://localhost:4000/reservations', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ date, time, numberOfPeople }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage('Reservation successful!');
                setError(false);
                //clears form
                setDate('');
                setTime('');
                setNumberOfPeople(1);
            } else {
                setMessage(data.message || 'Failed to make reservation');
                setError(true);
            }
        } catch (Error) {
            setMessage('Something went wrong. Please try again.');
            setError(true);
            console.error('Reservation error:', Error);
        } finally {
            setIsLoading(false);
        }
   
    }

    return (
        <div className="page-container">
            <div className="reservation-container">
                <div className="content-wrap">
                    <h1 className="reservation-title">Make a Reservation</h1>
                    
                    {message && (
                        <div className={Error ? "error-message" : "success-message"}>
                            {message}
                        </div>
                    )}
                    
                    <form onSubmit={handleReservation}>
                        <div className="input-group">
                            <label>Date:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="input-field"
                                min={new Date().toISOString().split('T')[0]}
                            />

                            <label>Time:</label>
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="input-field"
                            >
                                <option value="">Select a time</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>

                            <label>Number of People (Max 6):</label>
                            <input
                                type="number"
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(Math.min(6, Math.max(1, parseInt(e.target.value))))}
                                className="input-field"
                                min="1"
                                max="6"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn" 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Book Table'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Reservation;