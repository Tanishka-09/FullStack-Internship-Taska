const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =============================
   TEST SERVER
============================= */
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* =============================
   CREATE USER
============================= */
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "User added successfully" });
  });
});

/* =============================
   READ USERS
============================= */
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/* =============================
   UPDATE USER
============================= */
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
  db.query(sql, [name, email, age, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User updated successfully" });
  });
});

/* =============================
   DELETE USER
============================= */
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User deleted successfully" });
  });
});

/* =============================
   404 HANDLER
============================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =============================
   START SERVER
============================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
