import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("typescript");
});

app.listen(PORT);
