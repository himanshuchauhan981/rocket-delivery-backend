(async () => {
	const { default: Server } = await import('./config/server.js');
	await Server.initiate();
})();
