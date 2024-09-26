import { defineConfig } from 'drizzle-kit';

import { config } from './src/config';

export default defineConfig({
    schema: './src/models',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: config.DATABASE_URL,
    },
});
