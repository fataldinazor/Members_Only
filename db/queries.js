const pool = require("./pool");

//sign-up functions
async function checkUsernameExist(username) {
  const query = `SELECT username FROM users where username=$1;`;
  try {
    const user = await pool.query(query, [username]);
    return user.rows[0];
  } catch (err) {
    console.log("database query failed", err);
    throw new Error("An error occurred while checking the username");
  }
}

async function addNewUser({
  fname,
  lname,
  username,
  password,
  isMember,
  isAdmin,
}) {
  const query = `
    INSERT INTO users (fname, lname, username, password, is_member, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6);
    `;
  try {
    await pool.query(query, [
      fname,
      lname,
      username,
      password,
      isMember,
      isAdmin,
    ]);
  } catch (err) {
    console.log(err);
    throw new Error("An error occured while adding the user");
  }
}

//messages
async function addNewMessage(user_id, title, message, dateTime) {
  const query = `INSERT INTO user_messages(user_id, message_title, message, message_time) 
  VALUES ($1, $2, $3, $4)`;

  return await pool.query(query, [user_id, title, message, dateTime]);
}

async function getAllMessages() {
  const query = `
  SELECT users.username, user_messages.message_id, user_messages.user_id, user_messages.message_title, user_messages.message, user_messages.message_time FROM
  user_messages 
  INNER JOIN users 
  ON user_messages.user_id=users.user_id;`;
  const { rows } = await pool.query(query);
  return rows;
}

async function updateMembership(username) {
  const query = `UPDATE users SET is_member=true WHERE username=$1`;
  return await pool.query(query, [username]);
}

async function upadateAdminship(user_id) {
  const query = `UPDATE users SET is_admin=true WHERE user_id=$1`;
  return await pool.query(query, [user_id]);
}

async function getMessage(message_id){
  const query = `SELECT * FROM user_messages WHERE message_id=$1;`;
  const {rows}= await pool.query(query, [message_id]);
  return rows[0];
}

async function updateMessage(id, title, message){
  const query= `UPDATE user_messages SET message_title=$1, message=$2 WHERE message_id=$3`
  return await pool.query(query, [title, message, id]);
}

async function deleteMessage(id){
  const query= `DELETE FROM user_messages WHERE message_id= $1`;
  return await pool.query(query, [id]);
}

module.exports = {
  checkUsernameExist,
  addNewUser,
  addNewMessage,
  getAllMessages,
  updateMembership,
  upadateAdminship,
  getMessage,
  updateMessage,
  deleteMessage
};
