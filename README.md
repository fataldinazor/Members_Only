# Members Only Project

## To Start the Project

- Create a local PostgreSQL database.
- Create a `.env` file including `DATABASE_URL`, `PORT`, `SESSION_SECRET`, `ADMIN_SECRET`.
- Execute `psql mydatabase < node_modules/connect-pg-simple/table.sql`, changing `mydatabase` to the name of your database.
- Execute `node db/populatedb.js`.
- Execute `nodemon app.js`.

## Information about the Project

- The Project is part of The Odin Project curriculum. It challenges to create an app to authenticate and authorize the user logging into the website using `passport.js`.
- The website asks for a signup, and the password is stored in the database by securing it with `bcrypt.js`.
- The website gives different authorizations to different users:
  - When the user is not logged in, they can only see the messages but not the identity of the person who has written them, and they can't create their own messages on the website as well.
  - When the user is logged in and has become a member, they can see the messages and who has written them by their username, and they can now also create and update their own messages.
  - When the user has admin rights, they have all the rights a member has, and on top of that, they can also delete messages of others.
