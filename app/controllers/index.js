const db = require("../models");
const User = db.user;
const Transaction = db.transaction;

// create and save new user
exports.createUser = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Please insert valid content!",
		});
		return;
	}

	const user = req.body;

	const x = {
		email: user.email,
		password: user.password,
		fullname: user.fullname,
		type: user.type,
		number: user.number,
		balance: user.balance,
		isAdmin: user.isAdmin,
	};

	User.create(x)
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "An error occured creating user" });
		});
};

// update a user
exports.updateUser = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can be placed here!",
		});
		return;
	}

	const user = req.body;

	const userData = {
		fullname: user.fullname,
		balance: user.balance,
		userId: user.id,
	};

	User.update(userData, { where: { id: userData.userId } })
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "An error occured creating user" });
		});
};

// update a user's balance
exports.updateBalance = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can be placed here!",
		});
		return;
	}

	const user = req.body;

	const userData = {
		balance: user.balance,
		userId: user.id,
	};

	User.update(userData, { where: { id: userData.userId } })
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "An error occured creating user" });
		});
};

// delete a user
exports.deleteUser = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can be placed here!",
		});
		return;
	}

	User.destroy({ where: { id: req.body.userId } })
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "An error occured creating user" });
		});
};

// create and save new transaction
exports.createTransaction = (req, res) => {
	const transaction = req.body;

	const request = {
		title: transaction.title,
		amount: transaction.amount,
		type: transaction.type,
		sender: transaction.sender,
		receiver: transaction.receiver,
		userId: transaction.id,
	};

	Transaction.create(request)
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error while retrieving tutorial with id=" + id,
			});
		});
};

// Get the transaction for a given user
exports.findUserById = (req, res) => {
	const userId = req.params.id;

	User.findByPk(userId, { include: ["transaction", "budget"] })
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error while retrieving tutorial with id=" + id,
			});
		});
};

// Get all Users include transaction
exports.findAll = (req, res) => {
	User.findAll({ include: ["transaction", "budget"] })
		.then((data) => {
			res.json({ status: 200, data });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error have occurred",
			});
		});
};

// authenticate a user
exports.authenticate = async (req, res) => {
	if (!req.body.password || !req.body.email) {
		res.status(400).send({
			message: "Some error have occurred",
		});
		return;
	}
	const user = await User.findOne({
		where: { email: req.body.email },
		include: ["transaction", "budget"],
	});
	console.log("Selected user => " + JSON.stringify(user));
	if (user) {
		if (req.body.password === user.password) {
			res.status(200).json({ status: 200, message: "Success", data: user });
		} else {
			res.status(400).json({ status: 400, error: "Password Incorrect" });
		}
	} else {
		res.status(404).json({ status: 404, error: "User does not exist" });
	}
};
