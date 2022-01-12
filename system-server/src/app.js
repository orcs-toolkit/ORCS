require('dotenv').config();
const os = require('os');
const io = require('socket.io-client');
let socket = io(process.env.SOCKET_URI);

const performanceData = require('./components/perfData');
const sysData = require('./components/systemInfo');

socket.on('connect', () => {
	console.log('connected to socket server!');

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
		sysData()
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
