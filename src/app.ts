import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';

import { errorHandler } from '@/plugins/error-handler';
import { routes } from '@/routes';

import { config } from './config';
import { logger } from './lib/logger';
import { healthCheck } from './plugins/health-check';

const app = fastify({
    logger,
});

app.register(helmet);
app.register(cookie);
app.register(cors, {
    origin: config.ORIGIN,
    credentials: true,
});

app.register(routes, {
    prefix: '/api',
});

app.register(healthCheck);
app.setErrorHandler(errorHandler);

export default app;
