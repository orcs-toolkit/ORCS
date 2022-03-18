import os from 'os';
import { performanceData } from './components/perfData.mjs';
import { sysInfo } from './components/systemInfo.mjs';
import { Logger } from './service/logger.mjs';

const logger = new Logger();
var currentdate = new Date();
var datetime =
	currentdate.getDate() +
	'/' +
	(currentdate.getMonth() + 1) +
	'/' +
	currentdate.getFullYear() +
	' @ ' +
	currentdate.getHours() +
	':' +
	currentdate.getMinutes() +
	':' +
	currentdate.getSeconds();

export function socketMain(socket) {
	socket.on('connect', () => {
		// logger.info('connected to master server!');
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

		const dateData = {
			type: 'connected',
			data: `system of mac address: ${macA} has connected to the server with socket ID: ${socket.id} - ${datetime}`,
		};
		socket.emit('node:logs', dateData);

		performanceData().then((data) => {
			data.macA = macA;
			socket.emit('initPerfData', data);
		});

		let systemInfoInterval = setInterval(() => {
			sysInfo()
				.then((data) => {
					data.macA = macA;
					data.role = global.role;
					data.name = global.name;
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
			const data = {
				type: 'disconnected',
				data: `system of mac address: ${macA} has disconnected from server - Last Sync: ${datetime}`,
			};
			socket.emit('node:logs', data);
			clearInterval(systemInfoInterval);
			logger.warn('Disconnected from master server!');
		});
	});

	socket.on('updated:Ban', (data) => {
		if (data.role === global.role) {
			console.log(data);
		}
		// console.log(data);
	});
}
