This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

The app needs Node 12, if you have [NVM](https://github.com/nvm-sh/nvm) installed just run `nvm use` in your terminal.

Install the dependencies:

    yarn install

Run the development server:

    yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

#### Setup the database

1. Create the database:
   ```bash
   createdb dbg
   ```
2. Add the database URL as an environment variable in `.env`. On Linux you may need to provide a username and password.

```bash
cat <<<EOF >> .env
DATABASE_URL=postgresql://localhost/dbg
EOF
```

3. Run all migrations
   ```bash
   npm run dbmigrate up
   ```

#### Seeding the local database

To seed your database with data to get going quickly, you can run the file under `db/seeds.sql` by doing the following:

```bash
cat db/seeds.sql | psql dbg
```

## Applying database migrations

Database migrations are managed with [db-migrate](https://github.com/db-migrate/node-db-migrate). To create a new migration

```bash
npm run dbmigrate create description-for-your-migration
```

This will create an up and down migration as sql files in `db/migrations/sqls` as well as a javascript file in `db/migrations` to run the sql files.

Migrations are run with

```bash
npm run dbmigrate up
```

Migrations can be rolled back with

```bash
npm run dbmigrate down
```

You can do a dry-run to view the changes that will be applied without making any changes (for both up and down migrations)

```bash
npm run dbmigratedry up
```

## AWS Database Migrations and seeding

To run database migrations against the RDS databases on AWS you need to run the dbmigrate up command via AWS System Manager.

1. Log into the AWS account
2. Go to System Manager
3. Go to Session Manager
4. Click 'Start Session'
5. Select an instance (there should only be 1)
6. Click 'Start Session' - This should open up a terminal like window in your browser
7. Run `cd ~/discretionary-business-grants/ && git pull && npm run dbmigrate up`

To seed the AWS database start as session as above and then run:
`cd ~/discretionary-business-grants/ && source ./.env && cat db/seeds.sql | psql $DATABASE_URL`
