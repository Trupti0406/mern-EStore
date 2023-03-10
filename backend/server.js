import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;

// To fectch variables from .env file
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// To convert the form data into a json object inside req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Sever is running at http://localhost:${port}`);
});
