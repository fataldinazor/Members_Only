To start the Project
-> Create local PostgreSQL database
-> Create .env file including DATABASE_URL, PORT, SESSION_SECRET, ADMIN_SECRET
-> execute psql mydatabase < node_modules/connect-pg-simple/table.sql changing mydatabase to name of your database
-> execute node db/populatedb.js
-> execute nodemon app.js

Information about the Project
-> The Project is part of theOdinProject curriculum, it challenges to create an app to authenticate and autherize the user logging into the website using passportjs.
-> The Website asks for a signup and the password is stored into the database by securing it with bcryptjs.
-> The website gives different authorizations to different users
  -> When the user is not logged in, they can only see the messages but not the identity of the person who has written it and they can't create their own messages on the website as well
  -> When the user is logged in and has become a member, they can see the messages and who has written them by their username and they can now also create and update their own messages.
  -> When the user is having admin rigths they have all the rights a members has and on top of that they can also delete messages of others
