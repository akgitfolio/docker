const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Read the content of the local file
  fs.readFile("localfile.txt", "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error reading file\n");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    }
  });
});

const PORT = process.argv[2] || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
