import express from 'express';

import { getAllPoliciesExample, getAllPoliciesRouter } from './allPolicies.mjs';
import { getSinglePolicyRouter } from './singlePolicy.mjs';
import { setPolicyRouter } from './setPolicy.mjs';
import { updatePolicyRouter } from './updatePolicy.mjs';
import { deletePolicyRouter } from './deletePolicy.mjs';
import { roleBasedPolicyRouter } from './getPolicyByRole.mjs';
import { roleWisePolicyRouter } from './getRoleWisePolicy.mjs';
import { updateSinglePolicyRouter } from './updateSinglePolicy.mjs';

const router = express.Router();

router.use('/getPolicies', getAllPoliciesRouter);
router.use('/getPolicy', getSinglePolicyRouter);
router.use('/updatePolicy', updatePolicyRouter);
router.use('/setPolicy', setPolicyRouter);
router.use('/deletePolicy', deletePolicyRouter);
router.use('/getRolePolicy', roleBasedPolicyRouter);
router.use('/getRoleWisePolicy', roleWisePolicyRouter);
router.use('/updateSinglePolicy', updateSinglePolicyRouter);

router.get('/test', async (req, res) => {
	var data = getAllPoliciesExample();
	data.then((v) => {
		console.log('Data from function call', v);
		res.json(v);
	});
});

export { router as policyRouter };
