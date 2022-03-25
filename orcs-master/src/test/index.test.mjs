import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';

describe('Master Server', () => {
	let io, serverSocket, clientSocket;

	beforeAll((done) => {
		const httpServer = createServer();
		io = new Server(httpServer);
		httpServer.listen(() => {
			const port = httpServer.address().port;
			clientSocket = new Client(`http://localhost:${port}`);
			io.on('connection', (socket) => {
				serverSocket = socket;
			});
			clientSocket.on('connect', done);
		});
	});

	afterAll(() => {
		io.close();
		clientSocket.close();
	});

	test('should work', (done) => {
		clientSocket.on('hello', (arg) => {
			expect(arg).toBe('world');
			done();
		});
		serverSocket.emit('hello', 'world');
	});
});
