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
FOREIGN KEY (user_id) REFERENCES users(user_id));

INSERT INTO users (fname, lname, username, password, is_member, is_admin) VALUES
('Rohan', 'Verma', 'rohan123', '$2a$10$examplehash1', true, false),
('Aditya', 'Sharma', 'aditya01', '$2a$10$examplehash2', true, false),
('Varun', 'Patel', 'varunpatel', '$2a$10$examplehash3', false, false),
('Pranjal', 'Singh', 'pranjalsingh', '$2a$10$examplehash4', true, true),
('Aditi', 'Gupta', 'aditi_gupta', '$2a$10$examplehash5', false, false),
('Nisha', 'Jain', 'nishajain', '$2a$10$examplehash6', true, false),
('Ravi', 'Kumar', 'ravi_kumar', '$2a$10$examplehash7', false, false);

INSERT INTO user_messages (user_id, message_title, message, message_time)
VALUES
(1, 'Hello World', 'This is John Doe with my first message on this platform. I am excited to connect with everyone here and share my thoughts on technology, coding, and more!', '2024-08-20 09:30:00+00'),
(1, 'React Tips', 'Here are some tips to improve your React code: 1) Use hooks wisely. 2) Break down your components into smaller pieces. 3) Take advantage of React’s memoization to optimize performance.', '2024-08-21 11:15:00+00'),
(2, 'Meeting Reminder', 'Just a quick reminder for everyone: We have a team meeting scheduled for tomorrow at 10 AM. Please make sure to be there on time, as we have important topics to cover.', '2024-08-22 14:45:00+00'),
(2, 'Project Update', 'I wanted to update you all on the progress of our current project. We are on track and making great strides. Keep up the good work, and let’s push forward to meet our deadline!', '2024-08-25 16:00:00+00'),
(3, 'Welcome to the Forum', 'Hi everyone! I’m Alice, and I’m excited to join this community. I’m looking forward to learning from all of you and contributing to discussions on various topics.', '2024-08-23 08:00:00+00'),
(3, 'New Learning Resource', 'I recently found an excellent resource for learning Node.js. It has helped me improve my skills, and I thought I’d share it with you all. Check out Node.js Essentials!', '2024-08-26 10:00:00+00'),
(4, 'Admin Announcement', 'As the admin of this platform, I am pleased to announce that we will be rolling out new features soon. Stay tuned for updates and feel free to reach out with any feedback.', '2024-08-27 12:30:00+00'),
(5, 'New Member', 'Hello everyone! I’m Carol, and I’m happy to be a member of this platform. I’m looking forward to getting to know you all and engaging in meaningful discussions.', '2024-08-28 09:45:00+00'),
(6, 'Ideas for Improvement', 'I’ve been using this platform for a while now and have a few ideas on how we can improve the user experience. I’ll be sharing them in a detailed document soon.', '2024-08-29 13:00:00+00'),
(7, 'Upcoming Events', 'Here are some upcoming events you should know about: 1) Community Meetup on September 5th. 2) Coding Workshop on September 12th. Don’t miss out!', '2024-08-30 15:30:00+00'),
(7, 'Feedback on the Design', 'The design of this platform looks good overall, but I think we can make some tweaks to improve the user experience. I’ll provide specific feedback soon.', '2024-08-31 17:00:00+00');
`;

async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
