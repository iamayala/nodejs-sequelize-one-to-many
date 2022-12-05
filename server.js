const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOpts = {
	origin: "*",
	methods: ["GET", "POST"],
	allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Bolwer Bank" });
});

const index = require("./app/controllers/index.js");

// fetch all users
app.get("/users", index.findAll);

// fetch users by id
app.get("/users/:id", index.findUserById);

// create a user
app.post("/users/save", index.createUser);

// update a user
app.post("/users/update", index.updateUser);

// update a user's balance
app.post("/users/balance", index.updateBalance);

// delete a user
app.post("/users/delete", index.deleteUser);

// record a transaction
app.post("/users/transact", index.createTransaction);

// authenticate a user
app.post("/authenticate", index.authenticate);

// post a budget
app.post("/budget/create", index.createBudget);

// update a budget
app.post("/budget/update", index.updateBudget);

// delete a budget
app.post("/budget/delete", index.deleteBudget);

// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
