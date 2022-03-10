import express from 'express';

import { getAllPoliciesRouter } from './allPolicies.mjs';
import { getSinglePolicyRouter } from './singlePolicy.mjs';
import { setPolicyRouter } from './setPolicy.mjs';
import { updatePolicyRouter } from './updatePolicy.mjs';
import { deletePolicyRouter } from './deletePolicy.mjs';
import { roleBasedPolicyRouter } from './getPolicyByRole.mjs';

const router = express.Router();

router.use('/getPolicies', getAllPoliciesRouter);
router.use('/getPolicy', getSinglePolicyRouter);
router.use('/updatePolicy', updatePolicyRouter);
router.use('/setPolicy', setPolicyRouter);
router.use('/deletePolicy', deletePolicyRouter);
router.use('/getRolePolicy', roleBasedPolicyRouter);

export { router as policyRouter };
