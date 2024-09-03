const {body, validationResult}= require('express-validator');
const db= require("../db/queries");
const bcrypt= require('bcryptjs');

const signupUserGet=(req,res)=>{
    res.render('signupForm',{
        title:'Add new User',
        errors:[]
    } )
}

const alphaErr= 'must only contain letters';
const lengthErr='must be between 1 and 15 characters';

const validateUser=[
    body('fname').trim()
    .isAlpha().withMessage(`First Name ${alphaErr}`)
    .isLength({min:1, max:15}).withMessage(`First Name ${lengthErr}`),
    body("lname").trim()
    .isAlpha().withMessage(`Last Name ${alphaErr}`)
    .isLength({min:1, max:15}).withMessage(`Last Name ${lengthErr}`),
    body('username').exists().withMessage(`Please enter username`),
    body("password").exists().withMessage(`Please enter the password`).bail()
    .isStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1
    }).withMessage(`'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.' `),
    body('confirmPassword').exists().withMessage(`Confirm your Password`)
]

const checkUsernameExist=body("username").custom(async value=>{
    try{
        const user=await db.checkUsernameExist(value);
        if(user){
            throw new Error('Username already exist');
        }
    }catch(err){
        throw new Error(err.message);
    }
})

const checkSignupPasswordsMatch=body("confirmPassword").custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error("Passwords don't match");
    }
    return true;
})

const signupUserPost=[validateUser, checkUsernameExist,checkSignupPasswordsMatch, async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render('signupForm',{
            title:"Add new user",
            errors:errors.array()
        })
    }

    const {fname, lname, username, password, isMember, isAdmin}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password, 10);
        await db.addNewUser({fname, lname, username, password:hashedPassword, isMember, isAdmin});
    }catch(err){
        res.render('signupForm', {
            title: 'Add new User',
            errors:[{msg:err.message}]
        })
    }
    res.redirect('/log-in');
}]


module.exports={
    signupUserGet,
    signupUserPost
}