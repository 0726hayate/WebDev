import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

//details to connect to db
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "",
  port: 5432,
});
//connect to db
db.connect();

//middleware to get user input
app.use(bodyParser.urlencoded({ extended: true }));
//for static images and css
app.use(express.static("public"));

//function to get data from db
async function getItems(){
  try{
    const result = await db.query("SELECT * from items");
    let items =[];
    result.rows.forEach(item => {
      items.push(item);
    });
    return items;
  }catch(err){
    console.error("Error getting items:", err);
    return [];
  }
}

//show front page by getting db data, return as array into items
app.get("/", async (req, res) => {
  const items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

//adding a new item into the db
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
    await db.query(
      "INSERT INTO items (title) VALUES ($1)",
      [item]
    );
    res.redirect("/");
  }catch(err) {
    console.error("Error inserting new item: ", err);
  }


});


//editing items in a db, get user input and update it in the db
app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  console.log("Update query with:", item, id);

  try {
    const result = await db.query(
      "UPDATE items SET title = $1 WHERE id = $2",
      [item, id]
    );
    console.log("Update result:", result);
    res.redirect("/");
  } catch (err) {
    console.error("Error editing item:", err);
    res.status(500).send("Error editing item");
  }
});

//deleting items in a db
app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;

  try{
    await db.query(
      "DELETE FROM items WHERE id = $1", [id]
    );
    res.redirect("/");
  }catch(err){
    console.error("error deleting item: ", err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
