import Redis from 'ioredis';
import { Logger } from './logger.mjs';
const logger = new Logger();

export const redisClient = new Redis();
redisClient.on('connect', () => logger.info('Connected to Redis'));
redisClient.on('error', (err) =>
	logger.error("Couldn't establish connection to redis server")
);
