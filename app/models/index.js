const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.budget = require("./budget.model.js")(sequelize, Sequelize);

db.user.hasMany(db.transaction, { as: "transaction" });
db.user.hasMany(db.budget, { as: "budget" });
db.transaction.belongsTo(db.user, {
	foreignKey: "userId",
	as: "user",
});
db.budget.belongsTo(db.user, {
	foreignKey: "userId",
	as: "user",
});

module.exports = db;
