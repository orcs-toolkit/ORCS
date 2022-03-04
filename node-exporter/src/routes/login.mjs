import { socketMain } from '../socketMain.mjs';
export default function (io) {
	var routes = {};
	routes.index = async function (req, res) {
		const kempu = req.body.role;
		console.log('Received data:', kempu);
		let socket = io(process.env.SOCKET_URI, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
			reconnectionAttempts: 5,
		});
		// socket.emit('perfData', kempu);
		// socketMain(socket, kempu);
		res.send(kempu);
	};
	return routes;
}
