import express from 'express';
import { Policy } from '../../models/Policy.mjs';

const router = express.Router();

router.post('/:role', async (req, res) => {
	const policy = await Policy.findOneAndUpdate(
		{
			role: req.params.role,
		},
		{
			$set: {
				banList: req.body.banList,
			},
		},
		{
			new: true,
		}
	);

	if (!policy)
		res.status(401).send({
			message: 'Policy not found!',
		});

	res.status(201).send({
		message: 'Successfully updated policy',
		policy,
	});
});

export { router as updatePolicyRouter };
