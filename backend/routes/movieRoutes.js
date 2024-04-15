const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db/db");

router.get("/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.error("Error fetching movies:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching movies." });
      return;
    }
    res.status(200).json(result);
  });
});

router.get("/movies/:movieName", (req, res) => {
  const movieName = decodeURIComponent(req.params.movieName);
  db.query(
    "SELECT * FROM movies WHERE title = ?",
    [movieName],
    (err, result) => {
      if (err) {
        console.error("Error fetching movie details:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching movie details." });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Movie not found." });
        return;
      }
      res.status(200).json(result[0]);
    }
  );
});

module.exports = router;
