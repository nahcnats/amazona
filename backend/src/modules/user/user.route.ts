import express from 'express';
import requireUser from '../../middleware/requireUser';
import { registerUserHandler, getUsersHandler, getUserHandler, editUserHandler } from './user.controller';

const router = express.Router();

router.post('/register', registerUserHandler);
router.get('/', requireUser, getUsersHandler);
router.get('/:id', requireUser, getUserHandler);
router.patch('/:id', requireUser, editUserHandler);

export default router;