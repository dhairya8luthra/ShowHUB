const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "showhub",
});

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
router.get("/theatresbycity:cityname", (req, res) => {
  const cityname = decodeURIComponent(req.params.cityname);
  db.query(
    "SELECT * FROM theatre WHERE city = ?",
    [cityname],
    (err, result) => {
      if (err) {
        console.error("Error fetching Theatre details:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching Theatre details." });
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
