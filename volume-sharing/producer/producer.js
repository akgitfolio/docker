const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const dataPath = process.env.DATA_PATH || path.join(__dirname, "data.txt");

app.use(express.json());

app.post("/produce", (req, res) => {
  const data = req.body;
  fs.appendFileSync(dataPath, JSON.stringify(data) + "\n");
  res.status(201).send({ success: true, message: "Data received" });
});

app.listen(3000, () => {
  console.log("Producer service running on port 3000");
});
