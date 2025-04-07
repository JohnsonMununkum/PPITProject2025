import React, { useEffect, useState } from 'react';

function MyReservations() {
    //variables 
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://localhost:4000/my-reservations", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (data.success) {
                    console.log("Fetched reservations:", data.reservations);
                    setReservations(data.reservations);
                } else {
                    console.error("Failed to fetch reservations");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="my-reservations">
    
            {loading ? (
                <p className="center-text">Loading...</p>
            ) : reservations.length === 0 ? (
                <p className="center-text">No reservations found.</p>
            ) : (
                <div className="cards">
                    {reservations.map((res, index) => (
                        <div key={index} className="card">
                            <h3 className="date">
                                📅 {new Date(res.date).toLocaleDateString()}
                            </h3>
                            <p><strong>⏰ Time:</strong> {res.startTime} - {res.endTime}</p>
                            <p><strong>👥 Number of People:</strong> {res.numOfPeople}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
    
}

export default MyReservations;
