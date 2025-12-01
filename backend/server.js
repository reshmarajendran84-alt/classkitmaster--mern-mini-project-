require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/product");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/products", productRoutes);
app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log("Server running");
});
