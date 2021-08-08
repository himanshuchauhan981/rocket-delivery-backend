const mysql = require('mysql');

var pool = mysql.createPool({
	host: process.env.SQL_HOST,
	user: process.env.SQL_USER,
	password: process.env.SQL_PASSWORD,
	database: process.env.SQL_DATABASE,
});

let connect = (cb) => {
	return new Promise((resolve, reject) => {
		pool.on('connection', (connection) => {
			connection.on('error', (err) => {
				console.log('MySQL error event', err);
			});
			connection.on('close', (err) => {
				console.log('MySQL close event', err);
			});
		});
		resolve();
	});
};

let executeQuery = (query, params) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(
				{ sql: query, values: params, timeout: 60000 },
				(err, data) => {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

module.exports = { connect, executeQuery };
