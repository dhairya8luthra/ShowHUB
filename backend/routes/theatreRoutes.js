const express = require("express");
const router = express.Router();

const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken");

router.get("/Theatres", verifyToken, (req, res) => {
  db.query("SELECT * FROM Theatre", (err, result) => {
    if (err) {
      console.error("Error fetching Theatres:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching Theatres." });
      return;
    }
    res.status(200).json(result);
    console.log("Theatres fetched successfully");
    console.log(result);
  });
});

router.get("/Theatres/:TheatreName", (req, res) => {
  const TheatreName = decodeURIComponent(req.params.TheatreName);
  db.query(
    "SELECT * FROM theatre WHERE TheatreName = ?",
    [TheatreName],
    (err, result) => {
      if (err) {
        console.error("Error fetching Theatre details:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching Theatre details." });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Theatre not found." });
        return;
      }
      res.status(200).json(result[0]);
    }
  );
});
router.put("/updateTheatre/:theatreID", verifyToken, (req, res) => {
  const theatreID = req.params.theatreID;
  const { theatrename, noofscreens, city, address } = req.body;
  console.log(theatreID);
  console.log(req.body);
  // Ensure theatreID is provided
  if (!theatreID) {
    return res.status(400).json({ error: "Theatre ID is required." });
  }

  // Update theatre in the database
  const updateTheatreQuery =
    "UPDATE theatre SET TheatreName = ?, NoOfScreens = ?, city = ?, address = ? WHERE TheatreID = ?";
  db.query(
    updateTheatreQuery,
    [theatrename, noofscreens, city, address, theatreID],
    (err, result) => {
      if (err) {
        console.error("Error updating theatre:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating the theatre." });
        return;
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Theatre not found." });
      }
      res.json({ message: "Theatre updated successfully." });
    }
  );
});
router.post("/addTheatre", verifyToken, (req, res) => {
  const { theatrename, noofscreens, city, address } = req.body;

  // Generate a random number for the Theatre ID
  const TheatreId = Math.floor(Math.random() * 1000000) + 1;

  // Insert Theatre into database
  const insertTheatreQuery =
    "INSERT INTO theatre (TheatreID, TheatreName, NoOfScreens, city,address) VALUES (?, ?, ?, ?, ?)";
  db.query(
    insertTheatreQuery,
    [TheatreId, theatrename, noofscreens, city, address],
    (err, result) => {
      if (err) {
        console.error("Error adding Theatre:", err);
        res
          .status(500)
          .json({ error: "An error occurred while adding the Theatre." });
        return;
      }
      res.status(201).json({ message: "Theatre added successfully." });
    }
  );
});

router.delete("/deletetheatre", verifyToken, (req, res) => {
  const { theatreID } = req.body;

  // Ensure movieID is provided
  if (!theatreID) {
    return res.status(400).json({ error: "Theatre ID is required." });
  }

  const deletetheatreQuery = "DELETE FROM theatre WHERE TheatreID = ?";
  db.query(deletetheatreQuery, [theatreID], (err, result) => {
    if (err) {
      console.error("Error deleting movie:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the movie." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.json({ message: "Theatre deleted successfully." });
  });
});

module.exports = router;
