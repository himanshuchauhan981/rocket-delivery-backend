import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

export default class Server {
	app;

	static async initiate() {
		dotenv.config();
		this.app = express();

		const port = process.env.port;

		this.app.use(bodyParser.json());
		this.app.use(cors());

		const { default: Routes } = await import('../api/routes.js');
		const { default: MySQL } = await import('../db/MySQL.js');

		Routes.prepareRoutes(this.app);
		MySQL.create();

		this.app.listen(port, (err) => {
			if (err) console.log('Server error', err);
			else console.log(`Running on port ${port}`);
		});
	}
}
