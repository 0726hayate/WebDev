import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
  port: 5432,
});
db.connect();


async function checkVisisted(){
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];   
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}


app.get("/", async (req, res) => {
  
  const countries = await checkVisisted();
  res.render("index.ejs",{countries: countries, total:countries.length});
});

app.post("/add", async (req, res) => {
  try {
    // 1. get user input
    let userInput = req.body.country.trim();
    // 2. do query... where value = user input
    const matchResult = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) ILIKE '%'|| $1 || '%';", [userInput.toLowerCase()]);
    const countryCode = matchResult.rows[0].country_code;
    try{
      // 3. add to db not array
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
      // 4. redirect to "/"
      res.redirect("/");
      //check if country has been added
    }catch(err){
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added",
      });
    }
    //check if country exists
  } catch (err) {
    console.error(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
