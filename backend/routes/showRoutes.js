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

router.post("/updateshow", (req, res) => {
  const {
    showID,
    movieID,
    starttime,
    endtime,
    price,
    theatreid,
    screenid,
    isactive,
    date,
  } = req.body;
  // Check if any required values are missing
  if (
    !showID ||
    !movieID ||
    !starttime ||
    !endtime ||
    !price ||
    !theatreid ||
    !screenid ||
    !isactive ||
    !date
  ) {
    console.log(req.body);
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const query =
    "UPDATE shows SET MovieID=?, StartTiming=?, EndTime=?, Price=?, TheatreID=?, ScreenID=?, isActive=?, DateOfMovie=? WHERE showID = ?";
  db.query(
    query,
    [
      movieID,
      starttime,
      endtime,
      price,
      theatreid,
      screenid,
      isactive,
      date,
      showID,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Show not found" });
      }
      res.json({ message: "Show updated successfully" });
    }
  );
});

router.post("/deleteshow", (req, res) => {
  const { showID } = req.body;
  const query = "DELETE FROM shows WHERE showID = ?";
  db.query(query, [showID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Show not found" });
    }
    res.json({ message: "Show deleted successfully" });
  });
});

module.exports = router;
