import dotenv from 'dotenv';
dotenv.config();
import os from 'os';
import io from 'socket.io-client';
import { createSpinner } from 'nanospinner';

import { Logger } from './service/logger.mjs';
import { performanceData } from './components/perfData.mjs';
import { sysInfo } from './components/systemInfo.mjs';

const logger = new Logger();
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

(async () => {
	const spinner = createSpinner(
		'Checking if necessary configuration is set...'
	).start();
	await sleep();

	if (!process.env.SOCKET_URI) {
		spinner.error({ text: 'SOCKET_URI not defined!' });
		process.exit(1);
	}

	var socket = io(process.env.SOCKET_URI);

	spinner.success({ text: 'configuration successful' });

	socket.on('connect', () => {
		logger.info('connected to socket server!');
		// identify machine for unique marking, use mac address.
		const nI = os.networkInterfaces();
		let macA;

		// loop through all the network-interfaces of this machine
		// and find non-internal mac address
		for (let key in nI) {
			if (!nI[key][0].internal) {
				macA = nI[key][0].mac;
				break;
			}
		}

		performanceData().then((data) => {
			data.macA = macA;
			socket.emit('initPerfData', data);
		});

		let systemInfoInterval = setInterval(() => {
			sysInfo()
				.then((data) => {
					data.macA = macA;
					var x = {};
					var systemMac = { ...x };
					systemMac[macA] = data;
					socket.emit('perfData', systemMac);
				})
				.catch((err) => {
					socket.emit('sysDataError', err);
					throw err;
				});
		}, 1000);

		socket.on('disconnect', () => {
			clearInterval(systemInfoInterval);
		});
	});
})();
