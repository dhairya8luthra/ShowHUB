const express = require("express");
const router = express.Router();
const db = require("../db/db");

// Add a new screen
router.post("/addscreen", (req, res) => {
  const { screenid, theatreid, seatsavailable } = req.body;
  console.log(req.body);
  const query =
    "INSERT INTO screens (screenID, theatreID, seatsAvailable) VALUES (?, ?, ?)";
  db.query(query, [screenid, theatreid, seatsavailable], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred" });
    }
    res.status(201).json({ screenid, theatreid, seatsavailable });
  });
});

// Get a screen by ID
router.get("/screens/:screenID", (req, res) => {
  const { screenID } = req.params;
  const query = "SELECT * FROM screens WHERE screenID = ?";
  db.query(query, [screenID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Screen not found" });
    }
    console.log(result[0]);
    res.json(result[0]);
  });
});

// Update a screen
router.put("/screens/:screenID", (req, res) => {
  const { screenid } = req.params;
  const { theatreid, seatsavailable } = req.body;
  const query =
    "UPDATE screens SET theatreID = ?, seatsAvailable = ? WHERE screenID = ?";
  db.query(query, [theatreid, seatsavailable, screenid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.json({ screenID, theatreID, seatsAvailable });
  });
});

// Delete a screen
router.delete("/deletescreen/:screenID", (req, res) => {
  const { screenID } = req.params;
  const query = "DELETE FROM screens WHERE screenID = ?";
  db.query(query, [screenID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.json({ message: "Screen deleted successfully" });
  });
});

module.exports = router;
