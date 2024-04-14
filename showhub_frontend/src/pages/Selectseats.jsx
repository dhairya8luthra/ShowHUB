import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Selectseats() {
  const { showId, screenId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Define the seat layout for the screen
  const rows = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
    // Add more rows as needed
  ];

  const handleSeatClick = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);
    setSelectedSeats(
      isSelected
        ? selectedSeats.filter((seat) => seat !== seatNumber)
        : [...selectedSeats, seatNumber]
    );
  };

  const renderSeats = () => {
    return rows.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`} style={{ display: 'flex' }}>
        {row.map((seatNumber, seatIndex) => (
          <button
            key={`seat-${rowIndex}-${seatIndex}`}
            onClick={() => handleSeatClick(seatNumber)}
            style={{
              backgroundColor: selectedSeats.includes(seatNumber) ? 'green' : 'gray',
              color: 'white',
              margin: '5px',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {seatNumber}
          </button>
        ))}
      </div>
    ));
  };

  return (
    
    <div>
      <h2>Select Seats for Show {showId} on Screen {screenId}</h2>
      {renderSeats()}
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
    </div>
  );
}

export default Selectseats;