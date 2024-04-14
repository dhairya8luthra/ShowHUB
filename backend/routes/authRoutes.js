const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "showhub",
});

// Register route
router.post("/register", (req, res) => {
  const emailid = req.body.email;
  const password = req.body.password;
  const userId = Math.floor(Math.random() * (9999 - 1000) + 1000);

  db.query(
    "INSERT INTO user (userid, email, password) VALUES (?, ?, ?)",
    [userId, emailid, password],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).send("An error occurred while registering the user.");
      } else {
        res.status(200).send("User registered successfully.");
      }
    }
  );
});

// Login route
router.post("/login", (req, res) => {
  const emailid = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [emailid, password],
    (err, result) => {
      if (err) {
        console.error("Error logging in:", err);
        res.status(500).send("An error occurred while logging in.");
        return;
      }

      if (result.length === 0) {
        res.status(404).send("User not found or incorrect credentials.");
        return;
      }

      req.session.userId = result[0].userid; // Store user ID in session
      res.status(200).send("Login successful.");
    }
  );
});

module.exports = router;
