module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define("transaction", {
		title: { type: DataTypes.STRING },
		amount: { type: DataTypes.FLOAT },
		type: { type: DataTypes.STRING },
		sender: { type: DataTypes.INTEGER },
		receiver: { type: DataTypes.INTEGER },
		date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	});

	return Transaction;
};
