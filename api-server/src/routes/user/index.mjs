import express from 'express';

import { getAllUsersRouter } from './getAllUsers.mjs';
import { getUserByIdRouter } from './getUserById.mjs';
import { updateUserByIdRouter } from './updateUserDetails.mjs';
import { deleteUserByIdRouter } from './deleteUser.mjs';

const router = express.Router();

router.use('/getAllUsers', getAllUsersRouter);
router.use('/getUserById', getUserByIdRouter);
router.use('/updateUserById', updateUserByIdRouter);
router.use('/deleteUserById', deleteUserByIdRouter);

export { router as UsersRouter };
