<<<<<<< HEAD
//const generateStupidName = require("sillyname");
//have to goto package.json, below "main":.., enter:
//"type": "module",
import generateStupidName from "sillyname";
var silly = generateStupidName();

console.log(`my name is ${silly}.`);

//const superheroes = require("superheroes");
import superheroes from "superheroes";

var hero = superheroes.random();
=======
//const generateStupidName = require("sillyname");
//have to goto package.json, below "main":.., enter:
//"type": "module",
import generateStupidName from "sillyname";
var silly = generateStupidName();

console.log(`my name is ${silly}.`);

//const superheroes = require("superheroes");
import superheroes from "superheroes";

var hero = superheroes.random();
>>>>>>> 19b2325 (Initial commit)
console.log(`i am ${hero}.`);