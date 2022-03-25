import express from 'express';
import { ErrorLogs } from '../../models/ErrorLogs.mjs';
import { Logger } from '../../services/logger.mjs';

const router = express.Router();
const logger = new Logger();

router.get('/', async (req, res) => {
	try {
		const machineLogs = await ErrorLogs.find({});
		res.send(machineLogs);
	} catch (e) {
		logger.error(e.message);
	}
});

export { router as errorLogsRouter };
