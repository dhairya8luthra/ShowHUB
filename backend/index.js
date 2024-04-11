const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5137",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "emailId",
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24 * 1000 },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "showhub",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.post("/register", (req, res) => {
  const emailid = req.body.email;
  const password = req.body.password;
  const userId = Math.floor(Math.random() * (9999 - 1000) + 1000); // Generating a random 4-digit user ID

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

app.post("/login", (req, res) => {
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

      // User found and credentials are correct
      res.status(200).send("Login successful.");
    }
  );
});
