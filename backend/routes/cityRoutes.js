const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken");

// Route to fetch the list of cities
router.get("/cities", (req, res) => {
  const query = "SELECT DISTINCT city FROM theatre";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching cities:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching cities." });
      return;
    }
    const cities = results.map((result) => result.city);
    res.json(cities);
  });
});

// Protected route
router.get("/movies/:movieName/theatres/:cityName", verifyToken, (req, res) => {
  const movieName = decodeURIComponent(req.params.movieName);
  const cityName = decodeURIComponent(req.params.cityName);
  const query = `
    SELECT t.*
    FROM theatre t
    INNER JOIN shows s ON t.TheatreID = s.TheatreID
    INNER JOIN movies m ON s.MovieID = m.movieId
    WHERE m.title = ? AND t.city = ?
  `;
  db.query(query, [movieName, cityName], (err, results) => {
    if (err) {
      console.error("Error fetching theatres:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching theatres." });
      return;
    }
    res.json(results);
    console.log(results);
  });
});

module.exports = router;
