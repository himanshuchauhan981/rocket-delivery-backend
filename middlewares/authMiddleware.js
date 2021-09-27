let jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	if (req.headers.authorization) {
		let authorization = req.headers.authorization;
		let token = authorization.split('Bearer ')[1];
		if (token) {
			try {
				let decodedToken = jwt.verify(token, process.env.JWT_KEY);

				req.user = decodedToken;
			} catch (err) {
				return res.status(401).send({ msg: 'Invalid token' });
			}
			next();
		} else {
			res.status(401).send({ msg: 'Authentication required' });
		}
	} else {
		res.status(401).send({ msg: 'Authentication required' });
	}
};

module.exports = authMiddleware;
