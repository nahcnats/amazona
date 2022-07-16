import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { logger } from './utils';
import { CORS_ORIGIN } from './constants';
import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';

const PORT = process.env.PORT || 4000;

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));

// Routes
app.use('api/users', userRoute);
app.use('api/auth', authRoute);

// Listener
const server = app.listen(PORT, async () => {
    logger.info(`Server is listening at http://localhost:${PORT}`);
});

const signal = ["SIGTERM", "SIGINT"];

async function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info(`Good bye, got signal ${signal}`);
        server.close();

        process.exit(0);
    });
}

for (let i = 0; i < signal.length; i++) {
    gracefulShutdown(signal[i]);
}