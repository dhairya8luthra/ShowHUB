import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import axiosInstance from '../Auth/axios';
import './PastBooking.css';
import { useAuth } from '../context/AuthContext';

export default function PastBooking() {
  const { userEmail } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchPastBookings = async () => {
      try {
        console.log(userEmail);
        const response = await axiosInstance.get(`/pastbookings/${encodeURIComponent(userEmail)}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching past bookings:', error);
      }
    };

    fetchPastBookings();
  }, [userEmail]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axiosInstance.delete(`/cancelbooking/${encodeURIComponent(bookingId)}`);
      setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  return (
    <div className="past-booking-container">
      <Navbar />
      <div className="booking-table-container">
        <h2>Past Bookings</h2>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Movie</th>
              <th>Price</th>

              <th>Date</th>
              <th>No. of Tickets</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.bookingId}>
                <td>{booking.bookingId}</td>
                <td>{booking.totalPrice}</td>
              <td>{booking.movieName}</td>
                <td>{booking.created}</td>
                <td>{booking.noofseats}</td>
                <td>
                  <button className="cancel-button" onClick={() => handleCancelBooking(booking.bookingId)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
