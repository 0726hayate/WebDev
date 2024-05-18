//const generateStupidName = require("sillyname");
//have to goto package.json, below "main":.., enter:
//"type": "module",
import generateStupidName from "sillyname";
var silly = generateStupidName();

console.log(`my name is ${silly}.`);

//const superheroes = require("superheroes");
import superheroes from "superheroes";

var hero = superheroes.random();
console.log(`i am ${hero}.`);