import session from 'express-session';
import redisstore from 'connect-redis';
import { redisClient } from './redis-init.mjs';

var RedisStore = redisstore(session);
var sessionStore = new RedisStore({ client: redisClient });

export const sessionConfig = session({
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
