const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Smart Notes API is running" });
});

app.use("/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

