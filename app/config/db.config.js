module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "GREENB0X@2022",
	DB: "BowlerBank",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
