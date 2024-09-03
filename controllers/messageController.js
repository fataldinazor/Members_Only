const db= require("../db/queries");
const {body, validationResult} = require("express-validator")

const createMessageGet=(req,res)=>{
    if(req.user){
        if(req.user.is_member){
            res.render('createMessageForm',{
                errors:[]
            });
        }else
        res.redirect("/get-membership");
    }else{
        res.redirect('/log-in')
    }
}

const validateMessage=[
    body("title")
    .isLength({min:10, max:50}).withMessage(`The Title should contain between 10-50 characters`),
    body("message")
    .isLength({min:50, max:300}).withMessage(`The Message should contain between 50-300 characters`)
]

const createMessagePost=[validateMessage, async (req, res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render('createMessageForm',{
            errors:errors.array()
        })
    }
    const {dateTime, title, message}= req.body;
    const user_id=req.user.user_id;
    await db.addNewMessage(user_id, title, message, dateTime);
    res.redirect('/messages');
}]

const getAllMessages= async (req, res)=>{
    const messages= await db.getAllMessages();
    res.render('messages',{
        messages:messages
    })
}

const updateMessageGet=async(req, res)=>{
    const {message_id}= req.params;
    const message=await db.getMessage(message_id);
    if(req.user.user_id===message.user_id){
        res.render("updateMessage",{
            message: message,
            errors:[]
        })
    } else{
        res.redirect("/messages");
    }
}

const updateMessagePost= [validateMessage, async (req, res)=>{
    const errors = validationResult(req);
    const {message_id}= req.params;
    const {title, message}= req.body;
    if (!errors.isEmpty()) {
      return res.status(400).render("updateMessage", {
        message:message,
        errors: errors.array(),
      });
    }
    await db.updateMessage(message_id, title, message);
    res.redirect("/messages");
}]

const deleteMessage= async (req, res)=>{
    const {message_id}= req.params;
    await db.deleteMessage(message_id);
    res.redirect("/messages");
}

module.exports= {
    createMessageGet,
    createMessagePost, 
    getAllMessages, 
    updateMessageGet, 
    updateMessagePost, 
    deleteMessage
}