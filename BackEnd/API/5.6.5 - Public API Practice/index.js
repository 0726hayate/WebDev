
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req, res) => {
    res.render("index.ejs");
  
});



app.get("/get-joke", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    const jokeType = response.data.type;      
    res.render("index.ejs", { 
      type: jokeType,
      joke: response.data.joke,
      part1: response.data.setup,
      part2: response.data.delivery,
     });
     
  } catch (error) {
      console.log(error.response.data);
      res.status(500);
    };
  
});

app.get('/get-weather', async (req, res) => {
  try {
      const lat = req.query.lat;
      const long = req.query.long;

      const response = await axios.get(`http://www.7timer.info/bin/astro.php?lon=${long}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`);

      // Assuming the response contains the URL to the PNG image
      const weatherImageUrl = response.data.url;

      res.render("index.ejs", {
          weatherImageUrl: weatherImageUrl
      });
  } catch (error) {
      console.error('Error fetching weather data:', error);
      
      res.status(500).send('An error occurred while fetching weather data');
  }
});




app.get('/get-stock', async (req, res) => {
  try {
      //get the array of JSON objects
      const response = await axios.get("https://financialmodelingprep.com/api/v3/stock/list?apikey=u2fXwWBJk2YjXcP7Cuetr5WaY7C8qGD9");
      //give the array a name
      const stockList = response.data;
      //get user input, user query as this is a .get
      const stockSymbol = req.query.sym;
      //search for a specific object
      const foundStock = stockList.find(stock => stock.symbol === stockSymbol.toUpperCase());

      if (foundStock) {
          res.render("index.ejs", {
              name: foundStock.name,
              price: foundStock.price,
              exchange: foundStock.exchange,
              stockType: foundStock.type,
          });
      } else {
          // Stock not found
          res.status(404).send('Stock not found');
      }
  } catch (error) {
      res.status(500).send('An error occurred while fetching stock data');
  }
});



app.listen(port, () => {
    
});