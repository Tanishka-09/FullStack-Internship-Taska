const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@tanishka5429.",      // add password if you have one
  database: "tanishkadb"   // use SAME database from task 5
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

module.exports = db;
