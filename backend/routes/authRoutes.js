const express = require("express");
const router = express.Router();
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const secretKey = "jwt_secret_key";
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
      const token = jwt.sign({ userId: result[0].userid }, secretKey, {
        expiresIn: "1h", // Token expiration time
      });

      req.session.userId = result[0].userid;
      res.status(200).json({ token });
      console.log("Token:", token);
      // Store user ID in session
    }
  );
});
// Admin login route
router.post("/admin/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Error logging in admin:", err);
        res.status(500).send("An error occurred while logging in as admin.");
        return;
      }

      if (result.length === 0) {
        res.status(404).send("Admin not found or incorrect credentials.");
        return;
      }

      const token = jwt.sign({ adminId: result[0].id }, secretKey, {
        expiresIn: "1h", // Token expiration time
      });

      res.status(200).json({ token });
      console.log("Admin Token:", token);
    }
  );
});

module.exports = router;
