import express from 'express';
import { registerUserHandler } from './user.controller';

const router = express.Router();

router.post('/register', registerUserHandler);

export default router;