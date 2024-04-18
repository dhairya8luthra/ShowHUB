const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken");

router.get("/movies", verifyToken, (req, res) => {
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

router.post("/addmovie", verifyToken, (req, res) => {
  const {
    title,
    description,
    actors,
    genre,
    trailerLink,
    releaseDate,
    runningTime,
    createdAt,
    movieFormat,
  } = req.body;

  // Generate a random number for the movie ID
  const movieId = Math.floor(Math.random() * 1000000) + 1;

  // Insert movie into database
  const insertMovieQuery =
    "INSERT INTO movies (movieid, title, description, actors, genre, trailer_link, release_date, running_time, createdat, movie_format) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    insertMovieQuery,
    [
      movieId,
      title,
      description,
      actors,
      genre,
      trailerLink,
      releaseDate,
      runningTime,
      createdAt,
      movieFormat,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding movie:", err);
        res
          .status(500)
          .json({ error: "An error occurred while adding the movie." });
        return;
      }
      res.status(201).json({ message: "Movie added successfully." });
    }
  );
});

module.exports = router;
