import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import {
	checkAndAdd,
	setActiveState,
	onMachineDisconnect,
} from '../services/MachineCheckAndAdd.mjs';
import { updateLogs, sendLogs } from '../services/LogsUpdate.mjs';
import { Logger } from '../services/logger.mjs';

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

export function socketMain(io, socket, workerId) {
	(async () => {
		try {
			await mongoose.connect(process.env.MONGO_URI);
			logger.workerInfo(`Worker: ${workerId} connected to MongoDB`);
		} catch (err) {
			logger.error(err);
		}
	})();

	let macA;

	// console.log('Socket Session: ', socket.request.session);

	socket.on('clientAuth', async (key) => {
		if (key === 'student') {
			// valid UI client joined
			socket.join('student');
			logger.info(`Student with ID ${socket.id} joined!`);
			setActiveState(io);
		} else if (key === 'faculty') {
			socket.join('faculty');
			logger.info(`Faculty with ID ${socket.id} joined!`);
			setActiveState(io);
		} else if (key === 'admin') {
			socket.join('admin');
			const dateData = {
				type: 'connected',
				data: `Admin with ID ${socket.id} joined! - ${datetime}`,
			};
			await updateLogs(dateData, io);
			sendLogs(io);
			io.to('admin').emit('logs', dateData);
			logger.info(`Admin with ID ${socket.id} joined!`);
			setActiveState(io);
		} else {
			// invalid client
			socket.disconnect(true);
		}
	});

	socket.on('logout', async () => {
		var room = Array.from(socket.rooms);
		await socket.leave(room[1]);
		const dateData = {
			type: 'disconnected',
			data: `Client with socket id: ${socket.id} has left the room ${room[1]}!`,
		};
		await updateLogs(dateData, io);
		sendLogs(io);
		io.to('admin').emit('logs', dateData);
		logger.warn(`Leaving room: ${room[1]}`);
		logger.warn(`Client with socket id: ${socket.id} has left the room!`);
	});

	socket.on('disconnect', async () => {
		onMachineDisconnect(macA, io);
		const dateData = {
			type: 'disconnected',
			data: `Client with socket id: ${socket.id} has disconnected!`,
		};
		await updateLogs(dateData, io);
		sendLogs(io);
		io.to('admin').emit('logs', dateData);
		logger.warn(`Client with socket id: ${socket.id} has disconnected!`);
	});

	socket.on('initPerfData', async (data) => {
		macA = data.macA;
		const mongooseResponse = await checkAndAdd(data);
		logger.info(mongooseResponse);
	});

	socket.on('perfData', (data) => {
		io.to('admin').emit('data', data);
	});

	socket.on('updatedBanList', (data) => {
		console.log(`Sending ${data} to node-exporter`);
		socket.broadcast.emit('updated:Ban', data);
	});

	socket.on('node:logs', async (data) => {
		await updateLogs(data, io);
		sendLogs(io);
		io.to('admin').emit('logs', data);
	});
}
