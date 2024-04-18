const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../db/db");
const verifyToken = require("../middleware/verifytoken");

router.get("/seats/:showid/", verifyToken, (req, res) => {
  const showid = req.params.showid;
  db.query("SELECT * FROM seat WHERE showid = ?", [showid], (err, result) => {
    if (err) {
      console.error("Error fetching movies:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching movies." });
      return;
    }
    res.status(200).json(result);
    console.log(result);
  });
});

module.exports = router;
