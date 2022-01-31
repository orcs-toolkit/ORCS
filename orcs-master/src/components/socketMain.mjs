import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import {
	checkAndAdd,
	setActiveState,
	onMachineDisconnect,
} from '../services/MachineCheckAndAdd.mjs';
import { Logger } from '../services/logger.mjs';

const logger = new Logger();

(async () => {
	if (!process.env.SECRET_KEY) {
		logger.error('SECRET_KEY not defined!');
	}

	if (!process.env.MONGO_URI) {
		logger.error('MONGO_URI not specified!');
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		logger.workerInfo('connected to MongoDB');
	} catch (err) {
		throw new Error(err);
	}
})();

export function socketMain(io, socket) {
	let macA;

	// console.log('Socket Session: ', socket.request.session);

	socket.on('clientAuth', (key) => {
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
		logger.warn(`Leaving room: ${room[1]}`);
		logger.warn(`Client with socket id: ${socket.id} has left the room!`);
	});

	socket.on('disconnect', () => {
		onMachineDisconnect(macA, io);
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
}
