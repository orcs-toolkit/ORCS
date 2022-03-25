import express from 'express';
import { Logs } from '../../models/InfoLogs.mjs';
import { Logger } from '../../services/logger.mjs';

const router = express.Router();
const logger = new Logger();

router.get('/', async (req, res) => {
	try {
		const machineLogs = await Logs.find({});
		res.send(machineLogs);
	} catch (e) {
		logger.error(e.message);
	}
});

export { router as infoLogsRouter };
