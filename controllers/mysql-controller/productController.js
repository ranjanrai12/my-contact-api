const expresshandler = require("express-async-handler");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.host,
  port: "3306",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

/**
 * @GET all products
 * @route /api/product
 * @access public
 */
const getAllProducts = expresshandler(async (req, res, next) => {
  // con.connect(function (err) {
  //   if (err) throw err;
  //   con.query("SELECT * FROM Products", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //     res.json({ data: result });
  //   });
  // });

  res.send({
    data: [
      { id: 213, name: "short", description: "formal shirt", price: 3423 },
    ],
  });
});

const createProducts = expresshandler(async (req, res, next) => {
  con.connect(function (err) {
    if (err) throw err;
    const { id, name, description, price } = req.body;
    const query = `
  INSERT INTO Products (id, name, description, price) 
  VALUES (?, ?, ?, ?)
`;
    const values = [id, name, description, price];
    con.query(query, values, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json({ data: result });
    });
  });
});

module.exports = { getAllProducts, createProducts };
