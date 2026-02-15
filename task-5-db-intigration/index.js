const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* ---------- CREATE TABLE ---------- */
db.query(
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
  )`,
  (err) => {
    if (err) {
      console.error("❌ Table creation failed:", err.message);
    } else {
      console.log("✅ Users table ready");
    }
  }
);

/* ---------- ADD USER ---------- */
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "User added successfully",
      userId: result.insertId,
    });
  });
});

/* ---------- GET USERS ---------- */
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User added", id: result.insertId });
  });
});


/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

