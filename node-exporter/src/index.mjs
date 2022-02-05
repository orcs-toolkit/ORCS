import dotenv from 'dotenv';
dotenv.config();

import io from 'socket.io-client';
import { createSpinner } from 'nanospinner';

import { Logger } from './service/logger.mjs';
import { socketMain } from './socketMain.mjs';

const logger = new Logger();
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

(async () => {
	const spinner = createSpinner(
		'Checking if necessary configuration is set...'
	).start();
	await sleep();

	const spinner2 = createSpinner('Attempting to reconnect...');

	if (!process.env.SOCKET_URI) {
		spinner.error({ text: 'SOCKET_URI not defined!' });
		process.exit(1);
	}
	spinner.success({ text: 'configuration successful' });

	var socket = io(process.env.SOCKET_URI);
	socketMain(socket);

	socket.io.once('reconnect_error', () => {
		logger.error('Error connecting to the master server');
	});

	socket.io.once('reconnect_attempt', async () => {
		// logger.error('Attempting to reconnect...');
		await sleep();
		spinner2.start();
	});

	socket.on('connect', () => {
		spinner2.success({ text: 'connection established!' });
		logger.success('connected to master server!');
		// logger.debug(socket.connected);
	});

	process.on('SIGINT', () => {
		socket.disconnect(true);
		spinner2.error({ text: 'disconnected!' });
		process.exit(1);
	});
})();
