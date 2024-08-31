const express= require('express');
const session =require('express-session');
const passport =require('passport');
const LocalStrategy= require('passport-local').Strategy;

const app=express();
app.set("view engine", "ejs");

app.use(session(
    {
        secret:pro
    }
))