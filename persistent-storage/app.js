const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const dataFilePath = path.join("/data", "user-input.txt");

app.use(bodyParser.urlencoded({ extended: true }));

// Function to read the stored data from the file
const readStoredData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File does not exist, return empty string
          resolve("");
        } else {
          reject(err);
        }
      } else {
        resolve(data);
      }
    });
  });
};

app.get("/", async (req, res) => {
  try {
    const storedData = await readStoredData();
    res.send(`
      <form action="/submit" method="post">
        <input type="text" name="userInput" placeholder="Enter some text" required>
        <button type="submit">Submit</button>
      </form>
      <h2>Stored Data:</h2>
      <pre>${storedData}</pre>
    `);
  } catch (err) {
    res.status(500).send("Error reading stored data");
  }
});

app.post("/submit", (req, res) => {
  const userInput = req.body.userInput;
  const writeStream = fs.createWriteStream(dataFilePath, { flags: "a" });
  writeStream.write(`${userInput}\n`);
  writeStream.end();
  res.send("Data saved successfully! <a href='/'>Go back</a>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
