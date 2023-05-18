// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const env = process.env.NODE_ENV;

if (process.env.REMOTE_SERVER === 'HEROKU') {
  module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrationsRun: true,
    migrations: ['db/migrations/*.ts'],
    entities: ['entities/*.ts'],
    ssl: {
      rejectUnauthorized: false,
    },
    cli: {
      migrationsDir: 'db/migrations',
    },
  };
} else {
  module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:
      env === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE,
    synchronize: false,
    migrationsRun: true,
    migrations: ['db/migrations/*.ts'],
    entities: ['entities/*.ts'],
    ...(process.env.DB_SSL && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    cli: {
      migrationsDir: 'db/migrations',
    },
  };
}
