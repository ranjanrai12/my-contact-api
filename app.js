require("dotenv").config({ path: ".env" });
const express = require("express");
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const connectSqlDb = require("./config/sqlDbConnection");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();

app.use(errorHandler);

// mongodb connection
// connectDb();
// mysql connection
connectSqlDb();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://my-shopify-01.eu-central-1.elasticbeanstalk.com",
      "https://my-application-01.s3.eu-central-1.amazonaws.com/",
      "http://localhost:4201",
    ], // Replace with your Angular app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/product", productRouter);

app.use("/api/contacts", contactRouter);

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  console.log("Server runnin on the port", port);
});

app.listen(port, () => {
  console.log("Server runnin on the port", port);
});
