const db= require("../db/queries");
const userRouter = require("../routes/router");
const utils= require("../utils/utils");

const createMessageGet=(req,res)=>{
    if(req.user){
        res.render("createMessageForm")
    }
    else{
        res.redirect("/log-in")
    }
}

const createMessagePost=async (req, res)=>{
    // console.log(req.body);
    const {dateTime, title, message}= req.body;
    const user_id=req.user.user_id;
    await db.addNewMessage(user_id, title, message, dateTime);
    res.redirect('/messages');
}

const getAllMessages= async (req, res)=>{
    const messages= await db.getAllMessages();
    console.log(messages);
    res.render('messages',{
        messages:messages
    })
    // res.send("messages");
}

module.exports= {
    createMessageGet,
    createMessagePost, 
    getAllMessages
}