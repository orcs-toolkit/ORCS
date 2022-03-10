import os from 'os';
import { performanceData } from './components/perfData.mjs';
import { sysInfo } from './components/systemInfo.mjs';
import { Logger } from './service/logger.mjs';

const logger = new Logger();

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
