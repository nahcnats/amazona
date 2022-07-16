import express from 'express';
import requireUser from '../../middleware/requireUser';
import { loginHandler, logoutHandler } from './auth.controller';

const router = express.Router();

router.post('/login', loginHandler);
router.post('/logout', requireUser, logoutHandler);

export default router;