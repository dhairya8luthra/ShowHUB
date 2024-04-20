const express = require("express");
const router = express.Router();
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken");

// Route to get revenue from a particular movie in a particular theatre for the last N days
router.get(
  "/analytics/movie/:movieName/:theatreName/:days",
  verifyToken,
  (req, res) => {
    const movieName = decodeURIComponent(req.params.movieName);
    const theatreName = decodeURIComponent(req.params.theatreName);
    const days = parseInt(req.params.days);
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const query = `
    SELECT SUM(b.totalPrice) AS revenue
    FROM bookings b
    JOIN shows s ON b.showId = s.showId
    JOIN movies m ON s.movieId = m.movieid
    JOIN theatre t ON s.theatreId = t.TheatreID
    WHERE m.title = ? AND t.TheatreName = ? AND b.created >= ?
  `;

    db.query(query, [movieName, theatreName, startDate], (err, result) => {
      if (err) {
        console.error("Error fetching movie revenue:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching movie revenue." });
        return;
      }
      res.status(200).json(result[0]);
    });
  }
);

// Route to get total revenue for the last N days
router.get("/analytics/total/:days", verifyToken, (req, res) => {
  const days = parseInt(req.params.days);
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const callQuery = `CALL CalculateTotalRevenue(?, @totalRevenue);`;
  const selectQuery = `SELECT @totalRevenue AS totalRevenue;`;

  db.query(callQuery, [startDate], (callErr, callResult) => {
    if (callErr) {
      console.error("Error calling CalculateTotalRevenue:", callErr);
      res
        .status(500)
        .json({ error: "An error occurred while calculating total revenue." });
      return;
    }

    db.query(selectQuery, (selectErr, selectResult) => {
      if (selectErr) {
        console.error("Error fetching total revenue:", selectErr);
        res
          .status(500)
          .json({ error: "An error occurred while fetching total revenue." });
        return;
      }
      res.status(200).json(selectResult[0]);
    });
  });
});

// Route to get total revenue from a particular city for the last N days
router.get("/analytics/city/:city/:days", verifyToken, (req, res) => {
  const city = decodeURIComponent(req.params.city);
  const days = parseInt(req.params.days);
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const query = `
    SELECT SUM(b.totalPrice) AS cityRevenue
    FROM bookings b
    JOIN shows s ON b.showId = s.showId
    JOIN theatre t ON s.theatreId = t.TheatreID
    WHERE t.city = ? AND b.created >= ?
  `;

  db.query(query, [city, startDate], (err, result) => {
    if (err) {
      console.error("Error fetching city revenue:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching city revenue." });
      return;
    }
    res.status(200).json(result[0]);
  });
});

module.exports = router;
