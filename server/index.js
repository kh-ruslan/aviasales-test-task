const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a user

app.post("/users", async (req, res) => {
  try {
    const newUser = await pool.query(
      "INSERT INTO users DEFAULT VALUES RETURNING *"
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a user

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a user

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, shared } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET email = $1, shared = $2 WHERE id = $3 RETURNING *",
      [email, shared, id]
    );
    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("the server is up");
});
