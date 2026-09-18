import { Client }  from 'pg';
import "dotenv/config";

async function main() {
    console.log("seeding...");
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DB,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        ssl: process.env.DB_SSL === "true",
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done")
}

// messages drop table needs to come before users, as messages depends on user and 
// removing user first would cause an error. 
const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    member BOOLEAN NOT NULL,
    admin BOOLEAN not NULL
);

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER references users(id),
    title TEXT NOT NULL,
    time_created TIMESTAMPTZ NOT NULL,
    content TEXT NOT NULL
);`


main().catch((err) => {
    console.error(err);
    process.exit(1);
});