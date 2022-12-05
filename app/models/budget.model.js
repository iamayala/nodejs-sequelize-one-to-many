module.exports = (sequelize, DataTypes) => {
	const Budget = sequelize.define("budget", {
		title: { type: DataTypes.STRING },
		amount: { type: DataTypes.DOUBLE },
	});

	return Budget;
};
