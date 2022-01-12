const express = require('express');
const cluster = require('cluster');
const socketio = require('socket.io');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisAdapter = require('@socket.io/redis-adapter');
const { errorHandler } = require('@ssktickets/common');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const morgan = require('morgan');

const redisClient = require('../services/redis-init');
const socketMain = require('./socketMain');

// Passport config files
require('../services/jwt-auth');
require('../services/google-auth');

// Auth routes
const signupRouter = require('../routes/auth/signup');
const signinRouter = require('../routes/auth/signin');
const signoutRouter = require('../routes/auth/signout');
const currentuserRouter = require('../routes/auth/current-user');
const googleAuthRouter = require('../routes/auth/google-auth');

const protectedUserRouter = require('../routes/machine/protectedUser');

let sessionStore = new RedisStore({ client: redisClient });

function isWorker() {
	const sessionMiddleware = session({
		name: 'auth',
		secret: String(process.env.SECRET_KEY),
		resave: true,
		saveUninitialized: false,
		store: sessionStore,
		cookie: {
			secure: process.env.NODE_ENV === 'production' ? 'true' : 'auto',
			maxAge: 60000,
		},
	});

	// We don't need a port here because Master processes the requests.
	let app = express();
	app.use(express.json());
	app.use(
		cors({
			origin: true,
			credentials: true,
		})
	);
	app.use(sessionMiddleware);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(helmet());
	app.use(morgan('combined'));

	// Auth Routes
	app.use(signupRouter);
	app.use(signinRouter);
	app.use(googleAuthRouter);
	app.use(currentuserRouter);
	app.use(signoutRouter);

	app.use(protectedUserRouter);

	app.use(errorHandler);

	// Don't expose internal server to outside world.
	const server = app.listen(0, 'localhost');
	const io = socketio(server, {
		cors: {
			origin: '*',
		},
	});

	// Tell Socket.IO to use the redis adapter. By default, the redis
	// server is assumed to be on localhost:6379. You don't have to
	// specify them explicitly unless you want to change them.
	// redis-cli monitor.
	const pubClient = redisClient;
	pubClient.on('connect', () => console.log('connected to Redis Server'));
	pubClient.on('error', (err) =>
		console.log("Couldn't establish connection to redis server")
	);
	const subClient = pubClient.duplicate();
	io.adapter(redisAdapter(pubClient, subClient));

	const wrap = (middleware) => (socket, next) =>
		middleware(socket.request, {}, next);

	// io.use(function (socket, next) {
	// 	sessionMiddleware(socket.request, socket.request.res, next);
	// });
	// io.use(function (socket, next) {
	// 	sessionMiddleware(socket.handshake, {}, next);
	// });
	io.use(wrap(sessionMiddleware));
	io.use(wrap(passport.initialize()));
	io.use(wrap(passport.session()));

	// io.use(sharedsession(sessionMiddleware));
	// io.use(wrap(passport.authenticate(['jwt', 'google'])));

	io.on('connection', (socket) => {
		socketMain(io, socket);
		console.log(`Connected to worker: ${cluster.worker.id}`);
		// console.log(`Session: ${socket.request.sessionID}`);
	});

	// Listen to messages sent from master only.
	// Ignore everything else.
	process.on('message', (message, connection) => {
		if (message !== 'sticky-session:connection') {
			return;
		}

		server.emit('connection', connection);
		connection.resume();
	});
}

module.exports = isWorker;
