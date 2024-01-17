const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const dataPath = process.env.DATA_PATH || path.join(__dirname, "data.txt");

app.get("/consume", (req, res) => {
  if (fs.existsSync(dataPath)) {
    const data = fs.readFileSync(dataPath, "utf-8");
    res.status(200).send({
      success: true,
      data: data.split("\n").filter(Boolean).map(JSON.parse),
    });
  } else {
    res.status(404).send({ success: false, message: "No data found" });
  }
});

app.listen(3001, () => {
  console.log("Consumer service running on port 3001");
});
