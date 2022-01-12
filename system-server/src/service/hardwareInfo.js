const si = require('systeminformation');

function hardwareInfo() {
	return new Promise((resolve, reject) => {
		const system = si.system();
		const uuid = si.uuid();
		const bios = si.bios();
		const baseboard = si.baseboard();
		const chassis = si.chassis();

		resolve({
			system,
			uuid,
			bios,
			baseboard,
			chassis,
		});
	});
}

module.exports = hardwareInfo;
