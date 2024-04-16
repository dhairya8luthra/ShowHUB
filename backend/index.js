const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const cityRoutes = require("./routes/cityRoutes");
const showRoutes = require("./routes/showRoutes");
const seatRoutes = require("./routes/seatRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24 * 1000 },
  })
);

// Use authentication routes
app.use("/", authRoutes);

// Use movie routes
app.use("/", movieRoutes);

//Use Theatre routes
app.use("/", cityRoutes);
//Use Show routes
app.use("/", showRoutes);
//Use Seat routes
app.use("/", seatRoutes);
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
