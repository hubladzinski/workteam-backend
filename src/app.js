require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("../routes/users");
const inventoryRouter = require("../routes/inventory");
const tasksRouter = require("../routes/tasks");
const teamsRouter = require("../routes/teams");
const authRouter = require("../routes/auth");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pig1p.mongodb.net/${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use("/inventory", inventoryRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/trams", teamsRouter);
app.use("/login", authRouter);

module.exports = app;
