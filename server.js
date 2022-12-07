var express = require("express"),
	swaggerJsdoc = require("swagger-jsdoc"),
	swaggerUi = require("swagger-ui-express");
var app = express();
var bodyParser = require("body-parser");
const sql = require("./app/config/db");
const cors = require("cors");

var corsOptions = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowHeaders: ["Content-Type"],
};

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Bowler Bank API Doc",
			version: "1.0.0",
			description:
				"This is the documentation of my bank app API application made with Express and documented with Swagger",
			license: {},
			contact: {},
		},
		servers: [
			{
				url: "http://localhost:3001",
			},
		],
	},
	apis: ["./app/doc/index.js"],
};

const specs = swaggerJsdoc(options);
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: false })
);

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

app.post("/users/login", (req, res) => {
	var params = [req.body.email, req.body.password];
	var query = "SELECT * FROM user WHERE email = ? AND password = ?";
	sql.query(query, params, (err, data) => {
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		if (data.length == 0) {
			return res.json({ status: 404, title: "user not found" });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.get("/users/all", (req, res) => {
	var query = "SELECT * FROM user";
	sql.query(query, (err, data) => {
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
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.post("/users/create", (req, res) => {
	var params = [
		req.body.email,
		req.body.password,
		req.body.fullname,
		req.body.account_type,
		req.body.number,
		req.body.balance,
		req.body.isAdmin,
	];
	var query =
		"INSERT INTO user (email, password, fullname, account_type, number, balance, isAdmin) VALUES (?,?,?,?,?,?,?);";
	sql.query(query, params, (err, data) => {
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.post("/users/update", (req, res) => {
	var params = [
		req.body.password,
		req.body.fullname,
		req.body.balance,
		req.body.email,
	];
	var query =
		"UPDATE user SET password = ?, fullname = ?, balance = ? WHERE email = ?;";
	sql.query(query, params, (err, data) => {
		if (err) {
			return res.json({ status: 400, title: "bad request", data });
		}
		return res.json({ status: 200, mesage: "success", data });
	});
});

app.post("/users/delete", (req, res) => {
	var params = [req.body.email];
	var query = "DELETE FROM user WHERE email = ?;";
	sql.query(query, params, (err, data) => {
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
		if (err) {
			return res.json({ status: 400, title: "bad request" });
		}
		return res.json({ status: 200, title: "success", data });
	});
});

app.get("/transaction/all", (req, res) => {
	var query =
		"SELECT transaction.id, transaction.amount, transaction.date, sender.fullname AS sender_name, sender.number AS sender_number, sender.email as sender_email, receiver.fullname AS receiver_name, receiver.number AS receiver_number, receiver.email AS receiver_email, transaction_type.transaction AS transaction_type FROM transaction JOIN user sender ON transaction.sender = sender.id JOIN user receiver ON transaction.receiver = receiver.id JOIN transaction_type ON transaction.type = transaction_type.trans_id";
	sql.query(query, (err, data) => {
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

// Documenting with swagger
