const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 1000;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const contactRouter = require("./routes/contactRoute");
const careerRouter = require("./routes/careerRoute");

app.use(cors());

app.use("/api", contactRouter);
app.use("/api", careerRouter);

app.get("/", (req, res) => {
  res.send("Server is Ready!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
