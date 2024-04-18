import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

export default function BookingConfirmed() {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmBooking = async () => {
      // Your code for confirming the booking...

      // Once booking is confirmed, show alert
      alert('Your booking has been confirmed and details have been sent to your registered email');
      
      // Redirect to the movies page
      navigate('/home');
    };

    confirmBooking();
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
    </div>
  );
}