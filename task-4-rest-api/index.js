const express = require("express");
const app = express();

app.use(express.json()); // to handle JSON requests

// Temporary in-memory data store
let users = [];
let currentId = 1;

// ✅ Root route
app.get("/", (req, res) => {
  res.send("User REST API is running 🚀");
});

// ✅ CREATE User
app.post("/users", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: currentId++,
    name,
    email,
    age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// ✅ READ all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ✅ READ user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// ✅ UPDATE user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, age } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.age = age || user.age;

  res.json(user);
});

// ✅ DELETE user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
