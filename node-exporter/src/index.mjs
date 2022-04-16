import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import io from 'socket.io-client';

import { socketMain } from './socketMain.mjs';
import { loadingAnim } from './cli/loadingAnim.mjs';

const app = express();
app.use(express.json());

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
	global.role = role;
	global.name = name;
	console.log(`Role: ${global.role}, Name: ${global.name}`);
	res.send({
		message: `Role set to: ${global.role}`,
		user: `Currently logged user: ${global.name}`,
	});
});

app.post('/logout', (req, res) => {
	global.role = 'default';
	console.log(global.role);
	res.send({ message: `Role set to: ${global.role}` });
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`express server running on port: ${PORT}`);
});
