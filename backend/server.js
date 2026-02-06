const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "heritage_db",
  password: "1234",
  port: 5432
});

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    "INSERT INTO users(email,password) VALUES($1,$2) RETURNING *",
    [email, password]
  );
  res.json(result.rows[0]);
});

// Get monuments
app.get("/api/monuments", async (req, res) => {
  const result = await pool.query("SELECT * FROM monuments");
  res.json(result.rows);
});

// Get checkpoints
app.get("/api/checkpoints/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM checkpoints WHERE monument_id=$1 ORDER BY step_order",
    [req.params.id]
  );
  res.json(result.rows);
});

// Save quiz score
app.post("/api/quiz", async (req, res) => {
  const { user_id, monument_id, score } = req.body;
  await pool.query(
    "INSERT INTO quiz_scores(user_id, monument_id, score) VALUES($1,$2,$3)",
    [user_id, monument_id, score]
  );
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
