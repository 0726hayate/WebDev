import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

app.use(bodyParser.urlencoded({ extended: true}));

function bandNameGenerator(req, res, next) {
  bandName = req.body["street"] + req.body["pet"];//matches index.html
  next();
}

app.use(bandNameGenerator);

//to let the client see index.html
app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//html using java, lets client see a new html 
app.post("/submit", (req, res) =>{
  res.send(`<h1> Your Band name is: </h1> <h2> ${bandName} <h2>`);
});

