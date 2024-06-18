import express, { json } from "express";
import usersRouter from "./routes/users";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
import morgan from "morgan";
import { productRouter } from "./routes/products";
import cors from "cors";
import { calculateTotalProductsPurchased } from "./services/orderAnalysis";
configDevEnv();
connect();

const app = express();
console.log(process.env.JWT_SECRET);
//middleware chain
app.use(json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

//http://localhost:8080/api/v1/users
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use(express.static("public"));
app.use(errorHandler);
app.use(notFound);

//start the server:
app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
    console.log(`App is running in ${process.env.NODE_ENV} mode`);
    // calculateTotalProductsPurchased();

});

