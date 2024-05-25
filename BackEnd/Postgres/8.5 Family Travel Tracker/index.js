import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Setup PostgreSQL client with connection details
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
  port: 5432,
});

// Connect to the PostgreSQL database
db.connect();

// Middleware to parse URL-encoded bodies and serve static files from "public" directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Current user ID to keep track of the logged-in user
let currentUserId = 2;

// Function to check the countries visited by the current user
async function checkVisited() {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
    // Extract country codes from query result and return as an array
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    return countries;
  } catch (err) {
    console.error("Error checking visited countries:", err);
    return [];
  }
}

// Function to retrieve all users from the database
async function getUsers() {
  try {
    const result = await db.query("SELECT * FROM users");
    // Extract user data from query result and return as an array
    let users = [];
    result.rows.forEach((user) => {
      users.push(user);
    });
    return users;
  } catch (err) {
    console.error("Error getting users:", err);
    return [];
  }
}

// Function to get the current user's details
async function getCurrentUser() {
  try {
    const users = await getUsers();
    // Find and return the user with the matching currentUserId
    const foundUser = users.find(user => user.id == currentUserId);
    return foundUser;
  } catch (err) {
    console.error("Error finding user:", err);
    return "";
  }
}

// Route to render the home page with the list of visited countries and users
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    const users = await getUsers();
    const currentUser = await getCurrentUser();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      currentUser: currentUser
    });

  } catch (err) {
    console.error("Error rendering index page:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to add a new country to the visited list for the current user
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      throw new Error("Country not found");
    }

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      if (err.code === '23505') { // Unique violation (duplicate entry)
        console.log("Duplicate entry");
      } else {
        console.error("Error inserting visited country:", err);
      }
      const countries = await checkVisited();
      const users = await getUsers();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        error: "Country has already been added",
        color: (await getCurrentUser()).color
      });
    }
  } catch (err) {
    console.error("Error querying country code:", err);
    const countries = await checkVisited();
    const users = await getUsers();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      error: "Country name does not exist",
      color: (await getCurrentUser()).color
    });
  }
});

// Route to handle user switching and adding a new user
app.post("/user", async (req, res) => {
  if (req.body.add == "new") {//add new user
    res.render("new.ejs");
  } else {//show current user/tab
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

// Route to handle adding a new user to the database
app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",//get back what is added
      [name, color]
    );

    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.error("Error inserting new user:", err);
    res.status(500).send("Error inserting new user");
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
