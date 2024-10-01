const mysql = require("mysql");

const connectSqlDb = () => {
  const con = mysql.createConnection({
    host: process.env.host,
    port: "3306",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });

  con.connect(function (err) {
    if (err) {
      console.log(err.message);
      return;
    }
    const query =
      "CREATE TABLE Products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price int)";
    console.log("Database Connected!");
    con.query(query, function (err, result) {
      if (err) {
        // throw err;
        return;
      }
      console.log("Table created");
    });
  });
};

module.exports = connectSqlDb;
