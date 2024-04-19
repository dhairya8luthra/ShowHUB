const express = require("express");
const router = express.Router();
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
    posterlink,
    runningTime,
    createdAt,
    movieFormat,
  } = req.body;

  // Generate a random number for the movie ID
  const movieId = Math.floor(Math.random() * 1000000) + 1;

  // Insert movie into database
  const insertMovieQuery =
    "INSERT INTO movies (movieid, title, description, actors, genre, trailer_link, release_date,poster_link, running_time, createdat, movie_format) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      posterlink,
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

// PUT route to update movie data
router.put("/movies/:id", verifyToken, (req, res) => {
  const movieId = req.params.id;
  const {
    title,
    description,
    actors,
    genre,
    trailerLink,
    releaseDate,
    posterLink,
    runningTime,
    createdAt,
    movieFormat,
  } = req.body;

  // Update movie data in the database
  const updateMovieQuery =
    "UPDATE movies SET title = ?, description = ?, actors = ?, genre = ?, trailer_link = ?,  poster_link = ?, running_time = ?,  movie_format = ? WHERE movieid = ?";
  db.query(
    updateMovieQuery,
    [
      title,
      description,
      actors,
      genre,
      trailerLink,
      posterLink,
      runningTime,
      movieFormat,
      movieId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating movie:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating the movie." });
        return;
      }
      res.status(200).json({ message: "Movie updated successfully." });
    }
  );
});
router.delete("/deletemovie", verifyToken, (req, res) => {
  const { movieName } = req.body;

  // Ensure movieID is provided
  if (!movieName) {
    return res.status(400).json({ error: "Movie Name is required." });
  }

  const deleteMovieQuery = "DELETE FROM movies WHERE title = ?";
  db.query(deleteMovieQuery, [movieName], (err, result) => {
    if (err) {
      console.error("Error deleting movie:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the movie." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.json({ message: "Movie deleted successfully." });
  });
});

module.exports = router;
