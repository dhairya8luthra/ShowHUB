const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken"); // Import the verifyToken middleware

// Protected route
router.get(
  "/shows/movies/:moviename/theatre/:theatre_id",
  verifyToken,
  (req, res) => {
    const moviename = decodeURIComponent(req.params.moviename);
    const theatre_id = decodeURIComponent(req.params.theatre_id);

    db.query(
      "SELECT * FROM Shows JOIN Movies ON Shows.MovieID = Movies.movieId WHERE Shows.TheatreID = ? AND Movies.title = ?;",
      [theatre_id, moviename],
      (err, result) => {
        if (err) {
          console.error("Error fetching Show details:", err);
          res
            .status(500)
            .json({ error: "An error occurred while fetching show details." });
          return;
        }

        // Check if any shows are found
        if (result.length === 0) {
          res.status(200).json([]);
          return;
        }

        // Send the entire result array as the response
        res.status(200).json(result);
        console.log(result);
      }
    );
  }
);

module.exports = router;