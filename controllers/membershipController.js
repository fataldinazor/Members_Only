const db = require("../db/queries");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.resolve(__dirname, "../.env.development"),
});

const getMembership = (req, res) => {
  res.render("membershipForm");
};

const postMembership = async (req, res) => {
  const { membership } = req.body;
  if (membership === req.user.username) {
    await db.updateMembership(req.user.username);
    res.redirect("/messages");
  } else {
    res.redirect("/get-membership");
  }
};

const getAdminship = (req, res) => {
  res.render("membershipForm");
};

const postAdminship = async (req, res) => {
  const { adminship } = req.body;
  if (adminship === process.env.ADMIN_SECRET) {
    await db.upadateAdminship(req.user.user_id);
    res.redirect("/messages");
  } else {
    res.redirect("/get-membership");
  }
};

module.exports = {
  getMembership,
  postMembership,
  getAdminship,
  postAdminship,
};
