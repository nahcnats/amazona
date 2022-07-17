import express from 'express';
import requireUser from '../../middleware/requireUser';
import { registerUserHandler, getUsersHandler, getUserHandler, editUserHandler } from './user.controller';

const router = express.Router();

router.post('/register', registerUserHandler);
router.get('/users', requireUser, getUsersHandler);
router.get('/users/:id', requireUser, getUserHandler);
router.post('/users', requireUser, editUserHandler);

export default router;