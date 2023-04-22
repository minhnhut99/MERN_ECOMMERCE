require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./database/connectDB");
const app = express();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(require("./routes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server da khoi dong tai port ${PORT}`));
