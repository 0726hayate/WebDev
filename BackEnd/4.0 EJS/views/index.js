import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const date = new Date();
const dayOfWeek = date.getDay();

app.get("/", (req, res) => {

    var type = "Weekday";
    var adv = " its time to work hard";

    if(dayOfWeek == 0 || dayOfWeek == 6){
        var type = "Weekend";
        var adv = " its time to rest";
    }

    res.render( __dirname +"/index.ejs", {
        dayOfWeek: type, 
        advice: adv,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });
  