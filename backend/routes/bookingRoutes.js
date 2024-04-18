const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken");

// Route to create a booking
router.post("/createbooking", verifyToken, (req, res) => {
  const { showId, seats, userEmail, totalPrice, movieName } = req.body;
  const price = totalPrice / seats.length;
  // Ensure seats is always an array
  const selectedSeats = Array.isArray(seats) ? seats : [seats];

  // Generate a random booking ID (integer)
  const bookingId = Math.floor(Math.random() * 1000000) + 1;

  // Get user ID based on email
  const getUserQuery = "SELECT userid FROM user WHERE email = ?";
  db.query(getUserQuery, [userEmail], (getUserErr, userResults) => {
    if (getUserErr) {
      console.error("Error finding user:", getUserErr);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user." });
      return;
    }

    // Check if user exists
    if (userResults.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const userId = userResults[0].userid; // Assuming userid is the correct column name

    // Get current timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Insert booking into database
    const insertBookingQuery =
      "INSERT INTO bookings (bookingId, showId, noofseats, userId, created, totalPrice, movieName) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertBookingQuery,
      [
        bookingId,
        showId,
        selectedSeats.length,
        userId,
        timestamp,
        totalPrice,
        movieName,
      ],
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error("Error creating booking:", insertErr);
          res
            .status(500)
            .json({ error: "An error occurred while creating booking." });
          return;
        }

        // Update tickets table for each booked seat
        const insertTicketsQuery =
          "INSERT INTO tickets (seat_no, price, createdat, show_id, booking_id) VALUES (?, ?, ?, ?, ?)";
        const seatNumbers = selectedSeats.map((seat) =>
          parseInt(seat.substring(1))
        ); // Extract seat numbers
        selectedSeats.forEach(async (seat) => {
          const row_id = seat.substring(0, 1); // Assuming the row_id is always a single character
          const seat_id = parseInt(seat.substring(1)); // Assuming the seat_id is the remaining characters
          await db.query(insertTicketsQuery, [
            `${seat_id}`,
            price,
            timestamp,
            showId,
            bookingId,
          ]);
        });

        // Update seats table to mark booked seats as occupied
        const updateSeatsQuery =
          "UPDATE seat SET is_booked = 1 WHERE seat_no IN (?) AND showid = ?";
        db.query(
          updateSeatsQuery,
          [seatNumbers, showId], // Pass seatNumbers array instead of seat_id
          (updateSeatsErr, updateSeatsResults) => {
            if (updateSeatsErr) {
              console.error("Error updating seats:", updateSeatsErr);
              // Handle error
            }
          }
        );

        res.json({ message: "Booking created successfully." });
      }
    );
  });
});

module.exports = router;
