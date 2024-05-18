import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "angela";
const yourPassword = "ILOVEWEBDEV123";
const yourAPIKey = "1f259b7a-0038-42f3-815b-3980a0bcf85f";
const yourBearerToken = "0e16f3c6-4189-4236-837a-22d9e8a60a0a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  
  try{
    //TODO 2: Use axios to hit up the /random endpoint
    const result = await axios.get(API_URL + "/random");
    //The data you get back should be sent to the ejs file as "content"
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    res.render("index.js", {content: JSON.stringify(result.data)})
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try{
    //Specify that you only want the secrets from page 2
    const result = await axios.get(API_URL+"/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.status(404).send(error.message);
  }
  
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try{
    const result = await axios.get(API_URL+"/filer",{
      params: {
        score: 5,
        apikey:yourAPIKey,
      }
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.status(404).send(error.message);
  }
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

const config = {
  headers: {Authorization: `Bearer ${yourBearerToken}`},
};

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  try{
    const result = await axios.get(API_URL+"/secrects/42", config)
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch(error){
    res.status(404).send(error.message);
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
