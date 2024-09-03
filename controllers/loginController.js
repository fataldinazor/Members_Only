const db = require("../db/queries");
const pool =require("../db/pool");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

const loginUserGet = (req, res) => {
  if(req.user)
    res.redirect("/");
  else{
    res.render("loginForm", {
      errors: req.flash('error'),
    });
  }
};

const loginUserPost = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash:true
  })(req, res, next);
};

module.exports = {
  loginUserGet,
  loginUserPost,
};
