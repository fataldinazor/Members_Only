const { Client } = require("pg");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "../.env.development"),
});

const SQL = ` 
DROP TABLE IF EXISTS users, user_messages;

CREATE TABLE IF NOT EXISTS users(
user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
fname VARCHAR(127) NOT NULL,
lname VARCHAR (127) NOT NULL,
username VARCHAR (127) NOT NULL,
password VARCHAR(127) NOT NULL,
is_member BOOLEAN,
is_admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS user_messages(
message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INTEGER,
message_title VARCHAR(127) NOT NULL,
message VARCHAR(500) NOT NULL,
message_time TIMESTAMPTZ ,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`;

async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
