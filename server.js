var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const sql = require("./app/config/db");
const cors = require("cors");

var corsOptions = {
	origin: "*",
	methods: ["GET", "POST"],
	allowHeaders: ["Content-Type"],
};

// Allow CORS
app.use(cors(corsOptions));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// my default port
var HTTP_PORT = 3001;

// Start server
app.listen(HTTP_PORT, () => {
	console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/users/all", (req, res) => {
	var query =
		"SELECT * FROM user JOIN account_type ON user.account_type = account_type.type_id";
	sql.query(query, (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.get("/users/:email", (req, res) => {
	var query =
		"SELECT * FROM user JOIN account_type ON user.account_type = account_type.type_id WHERE user.email = ?";
	sql.query(query, [req.params], (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.post("/users/create", (req, res) => {
	console.log(req.body);
	var params = [
		req.body.email,
		req.body.fullname,
		req.body.password,
		req.body.account_type,
		req.body.number,
		req.body.balance,
		req.body.isAdmin,
	];
	var query =
		"INSERT INTO user (email, password, fullname, account_type, number, balance, isAdmin) VALUES (?,?,?,?,?,?,?);";
	sql.query(query, params, (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.put("/users/update", (req, res) => {
	console.log(req.body);
	var params = [
		req.body.password,
		req.body.fullname,
		req.body.balance,
		req.body.email,
	];
	var query =
		"UPDATE user SET password = ?, fullname = ?, balance = ? WHERE email = ?;";
	sql.query(query, params, (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.delete("/users/delete", (req, res) => {
	console.log(req.body);
	var params = [req.body.email];
	var query = "DELETE FROM user WHERE email = ?;";
	sql.query(query, params, (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

// TRANSACTIONS
app.post("/transaction/create", (req, res) => {
	const params = [
		req.body.amount,
		req.body.type,
		req.body.date,
		req.body.sender,
		req.body.receiver,
	];
	var query =
		"INSERT INTO transaction (amount, type, date, sender, receiver) VALUES (?,?,?,?,?); ";
	sql.query(query, params, (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request" });
		}
		return res.json({ status: 200, title: "success" });
	});
});

app.get("/transaction/all", (req, res) => {
	var query =
		"SELECT transaction.id, transaction.amount, transaction.date, sender.fullname AS sender_name, sender.number AS sender_number, sender.email as sender_email, receiver.fullname AS receiver_name, receiver.number AS receiver_number, receiver.email AS receiver_email, transaction_type.transaction AS transaction_type FROM transaction JOIN user sender ON transaction.sender = sender.id JOIN user receiver ON transaction.receiver = receiver.id JOIN transaction_type ON transaction.type = transaction_type.trans_id";
	sql.query(query, (err, data) => {
		console.log(err);
		if (err) {
			return res.json({ status: 400, title: "bad request" });
		}
		return res.json({ status: 200, title: "success", data });
	});
});

// TRANSACTION TYPE
app.get("/transaction_type/all", (req, res) => {
	var query = "SELECT * FROM transaction_type";
	sql.query(query, (err, data) => {
		if (err) {
			return res.json({ status: 400, title: "bad request" });
		}
		return res.json({ status: 200, title: "success", data });
	});
});

// ACCOUNT TYPE
app.get("/account_type/all", (req, res) => {
	var query = "SELECT * FROM account_type";
	sql.query(query, (err, data) => {
		if (err) {
			return res.json({ status: 400, title: "bad request" });
		}
		return res.json({ status: 200, title: "success", data });
	});
});

// Root path
app.get("/", (req, res, next) => {
	res.json({ message: "Ok" });
});
