import app from './app';
import { config } from './config';

app.listen({
    port: config.PORT,
    host: config.HOST,
});
