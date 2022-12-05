module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		email: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING },
		fullname: { type: DataTypes.STRING },
		type: { type: DataTypes.STRING },
		number: { type: DataTypes.STRING },
		balance: { type: DataTypes.DOUBLE },
		isAdmin: { type: DataTypes.BOOLEAN },
	});

	return User;
};
