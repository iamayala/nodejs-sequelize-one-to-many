const mysql = require("mysql2");
const db = require("./db.config");

// Create a connection to the database
const connection = mysql.createConnection({
	host: db.HOST,
	user: db.USER,
	password: db.PASSWORD,
	database: db.DB,
	port: db.PORT,
});

// open the MySQL connection
connection.connect((error) => {
	if (error) throw error;
});

module.exports = connection;
