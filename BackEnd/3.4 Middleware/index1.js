//dyanmic path handling
//basic bodyparser use, returns what is submitted?

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (usually for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the home page
app.get("/", (req, res) => {
  // Send the index.html file located in the 'public' directory
  res.sendFile(__dirname + "/public/index.html");
});

// Define a route to handle form submission
app.post("/submit", (req, res) => {
  // Log the data submitted in the form
  console.log(req.body); 
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
