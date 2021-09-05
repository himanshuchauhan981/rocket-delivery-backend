const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const commonFunctions = {
	generateHashPassword: (password) => {
		let salt = bcryptjs.genSaltSync(10);
		let hash = bcryptjs.hashSync(password, salt);
		return hash;
	},

	generateJWTToken: (userData) => {
		let privateJWTKey = process.env.JWT_KEY;
		let token = jwt.sign(userData, privateJWTKey, { expiresIn: '24h' });
		return token;
	},

	compareHashedPassword: (passwordString, hashedPassword) => {
		return bcryptjs.compareSync(passwordString, hashedPassword);
	},
};

module.exports = commonFunctions;
