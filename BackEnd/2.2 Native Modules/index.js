<<<<<<< HEAD
<<<<<<< HEAD
const fs = require ("fs");

fs.writeFile("msg.txt","Hello from NodeJS!", (err)=>{
    if(err) throw err;
    console.log("File has been saved");
});

fs.readFile("./msg.txt", "utf8", (err, data)=> {
    console.log(data);
=======
const fs = require ("fs");

fs.writeFile("msg.txt","Hello from NodeJS!", (err)=>{
    if(err) throw err;
    console.log("File has been saved");
});

fs.readFile("./msg.txt", "utf8", (err, data)=> {
    console.log(data);
>>>>>>> 19b2325 (Initial commit)
=======
const fs = require ("fs");

fs.writeFile("msg.txt","Hello from NodeJS!", (err)=>{
    if(err) throw err;
    console.log("File has been saved");
});

fs.readFile("./msg.txt", "utf8", (err, data)=> {
    console.log(data);
>>>>>>> origin/master
});