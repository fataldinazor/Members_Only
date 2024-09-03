const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const pool = require("./db/pool");
const app = express();
const userRouters = require("./routes/router");
const PORT = process.env.PORT;
const path = require('path');

app.set("view engine", "ejs");

app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", userRouters);

app.listen(PORT, () =>
  console.log("The server is listening at PORT " + process.env.PORT)
);
