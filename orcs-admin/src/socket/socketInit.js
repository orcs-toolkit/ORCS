import io from 'socket.io-client';
let socket = io.connect('http://localhost:4000');
socket.emit('clientAuth', process.env.AUTH_SECRET);

export default socket;
