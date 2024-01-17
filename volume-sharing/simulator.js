const http = require("http");

// Function to generate random data
function generateData() {
  return {
    timestamp: new Date().toISOString(),
    value: Math.floor(Math.random() * 100),
  };
}

// Function to send POST request to the producer
function sendPostRequest() {
  const data = JSON.stringify({ data: JSON.stringify(generateData()) });

  const options = {
    hostname: "localhost",
    port: 3000,
    path: "/produce",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const req = http.request(options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      console.log("Data sent:", data);
      console.log("Response:", responseData);
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error.message);
  });

  req.write(data);
  req.end();
}

// Function to fetch data from the consumer
function fetchData() {
  const options = {
    hostname: "localhost",
    port: 3001,
    path: "/consume",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      console.log("Data received:", responseData);
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error.message);
  });

  req.end();
}

// Simulate sending POST requests every 5 seconds
setInterval(sendPostRequest, 1000);

// Fetch data from the consumer every 5 seconds
setInterval(fetchData, 1000);
