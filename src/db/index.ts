import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import { config } from '@/config';

const pg = postgres(config.DATABASE_URL, {
    onnotice: () => {},
});

export const db = drizzle(pg);

/* Once you have your CI/CD process set up, you should migrate there instead of on app start */
migrate(db, { migrationsFolder: 'drizzle' });
