const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "basedatos"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL conectado");
  }
});

module.exports = db;