import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { Button, Modal, Group, Text } from '@mantine/core';
import axiosInstance from '../Auth/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './selectedseats.css' // Import the useAuth hook

function SelectSeats() {
  const { showId, screenId, movietitle, price } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [seatData, setSeatData] = useState([]);
  const { userEmail } = useAuth(); // Access the userEmail from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeatData();
  }, [showId]);

  const fetchSeatData = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3001/seats/${showId}`);
      const data = response.data;
      setSeatData(data);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  };

  const handleSeatClick = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);
    setSelectedSeats(
      isSelected
        ? selectedSeats.filter((seat) => seat !== seatNumber)
        : [...selectedSeats, seatNumber]
    );
  };

  const handleBookSeats = () => {
    setShowModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      // Make a POST request to create the booking
      const response = await axiosInstance.post('http://localhost:3001/createbooking', {
        showId: showId,
        seats: selectedSeats, // Map selectedSeats to object format
        userEmail: userEmail, // Use the userEmail from AuthContext
        totalPrice: selectedSeats.length * price, // Calculate total price
        movieName: movietitle,
      });

      // If booking created successfully, navigate to booking confirmation page
      if (response.data.message === "Booking created successfully.") {
        console.log('Booking created successfully');
        navigate('/bookingconfirmed');
      } else {
        console.error('Error creating booking:', response.data.error);
        // Handle error
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error
    }
  };

  const renderSeats = () => {
    const bookedSeats = seatData.filter((seat) => seat.is_booked === 1).map((seat) => `${seat.row_id}${seat.seat_no}`);

    const rows = Array.from(new Set(seatData.map((seat) => seat.row_id))).map((row) => {
      const seatsInRow = seatData.filter((seat) => seat.row_id === row);
      return seatsInRow.map((seat) => {
        const seatNumber = `${seat.row_id}${seat.seat_no}`;
        return (
          <button
            key={seatNumber}
            onClick={() => handleSeatClick(seatNumber)}
            disabled={seat.is_booked === 1}
            style={{
              backgroundColor: seat.is_booked === 1
                ? 'gray'
                : selectedSeats.includes(seatNumber)
                ? 'green'
                : 'black',
              color: 'white',
              margin: '5px',
              padding: '10px',
              border: 'none',
              cursor: seat.is_booked === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            {seatNumber}
          </button>
        );
      });
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Screen</span>
        </div>
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: 'flex', justifyContent: 'center' }}>
            {row}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className='tbc'>
        <h2>Select Seats for Show {movietitle} on Screen {screenId}</h2>
        {renderSeats()}
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Legend</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: 'black',
                width: '20px',
                height: '20px',
                marginRight: '10px',
              }}
            />
            <span>Available Seat</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: 'green',
                width: '20px',
                height: '20px',
                marginRight: '10px',
              }}
            />
            <span>Selected Seat</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: 'gray',
                width: '20px',
                height: '20px',
                marginRight: '10px',
              }}
            />
            <span>Booked Seat</span>
          </div>
          <Button onClick={handleBookSeats} disabled={!selectedSeats.length}>Book Seats</Button>
        </div>
        <Modal
          opened={showModal}
          onClose={() => setShowModal(false)}
          title="Booking Summary"
        >
          <Group direction="column" spacing="xs">
            <Text>Show: {movietitle}</Text>
            <Text>Screen: {screenId}</Text>
            <Text>Selected Seats: {selectedSeats.join(', ')}</Text>
            <Text>Total price: Rs{selectedSeats.length * price}</Text>
            <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
            {/* Add additional booking details as needed */}
          </Group>
        </Modal>
      </div>
    </div>
  );
}

export default SelectSeats;