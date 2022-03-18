import mongoose from 'mongoose';
import { Logs } from '../models/Logs.mjs';

export async function updateLogs(data, io) {
	return new Promise(async (resolve, reject) => {
		let machineLogs = new Logs({ logs: data });
		await machineLogs.save();
		resolve('Logs updated!');
	});
}

export async function sendLogs(io) {
	const machineLogs = await Logs.find({});
	io.to('admin').emit('logsData', machineLogs);
}
