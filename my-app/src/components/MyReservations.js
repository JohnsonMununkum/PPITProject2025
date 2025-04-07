import React, { useEffect, useState } from 'react';

function MyReservations() {
    //variables 
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); 


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

    //method to handle delete when user clicks the delete buton
    //popup comes up onto the screen and asks if you want to delete the reservation
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    
        //delet request ent to the backend
        try {
            const res = await fetch(`http://localhost:4000/reservations/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    

            const data = await res.json();

            //if everything goes well delete the reservation
            if (data.success) {
                setReservations(prev => prev.filter(r => r._id !== id));
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    //method to handle an edit on a reservation
    //put rewuest sent to the backend with a new time,date, and num of ppl
    const handleEditSubmit = async () => {
        const token = localStorage.getItem("token");
        const { _id, date, startTime, numOfPeople } = editing;
    
        //put request sent to backend
        try {
            const res = await fetch(`http://localhost:4000/reservations/${_id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date, time: startTime, numberOfPeople: numOfPeople })
            });
    
            const data = await res.json();

            //if it goes well the reservation is updated  & modal is closed
            if (data.success) {
                setReservations(prev => prev.map(r => r._id === _id ? data.reservation : r));
                //closing the modal
                setEditing(null);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    };
    
    //this opens the edit modal
    const openEditModal = (reservation) => {
        setEditing({
            ...reservation,
            //format for the date 
            date: reservation.date.split("T")[0] 
        });
    };
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
                         {/*  buttons to delete or edit a reservation */}
                          <div className="card-actions">
                                <button className="btn-delete" onClick={() => handleDelete(res._id)}>x</button>
                                <button className="btn-edit" onClick={() => openEditModal(res)}>...</button>
                         </div>
                            <h3 className="date">
                                📅 {new Date(res.date).toLocaleDateString()}
                            </h3>
                            <p><strong>⏰ Time:</strong> {res.startTime} - {res.endTime}</p>
                            <p><strong>👥 Number of People:</strong> {res.numOfPeople}</p>
                        </div>
                    ))}

                    {/*  editing */}
                    {editing && (
                            <div className="edit-modal">
                                <div className="modal-content">
                                    <h3>Edit Reservation</h3>
                                    <label>Date:</label>
                                    <input
                                        type="date"
                                        value={editing.date}
                                        onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                                    />

                                    <label>Time:</label>
                                    <select
                                        value={editing.startTime}
                                        onChange={(e) => setEditing({ ...editing, startTime: e.target.value })}
                                    >
                                        <option value="6:00 PM">6:00 PM</option>
                                        <option value="7:00 PM">7:00 PM</option>
                                        <option value="8:00 PM">8:00 PM</option>
                                    </select>

                                    <label>Number of People:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="6"
                                        value={editing.numOfPeople}
                                        onChange={(e) => setEditing({ ...editing, numOfPeople: e.target.value })}
                                    />

                                    {/*  buttons to save edit or cancel edit in the modal*/}
                                    <div className="modal-buttons">
                                        <button className="btn-save" onClick={handleEditSubmit}>Save</button>
                                        <button className="btn-cancel" onClick={() => setEditing(null)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}


                </div>
            )}
        </div>
    );
    
    
}

export default MyReservations;
