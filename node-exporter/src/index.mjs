import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import io from 'socket.io-client';

import { socketMain } from './socketMain.mjs';
import { loadingAnim } from './cli/loadingAnim.mjs';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

global.role = 'default';

let socket = io(process.env.SOCKET_URI, {
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionDelayMax: 5000,
	reconnectionAttempts: 5,
});
loadingAnim(socket);
socketMain(socket);

app.post('/role', async (req, res) => {
	const { role, name } = req.body;
	// console.log(`Received: ${role}, ${name}`);
	global.role = role;
	global.name = name;
	// console.log(`Role: ${global.role}, Name: ${global.name}`);
	res.status(200).send({
		message: `Role set to: ${global.role}`,
		user: `Currently logged user: ${global.name}`,
		success: true,
	});
});

app.post('/logout', (req, res) => {
	global.role = 'default';
	global.name = '';
	console.log(global.role);
	res.send({
		message: `Role set to: ${global.role}`,
		success: true,
	});
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`express server running on port: ${PORT}`);
});
