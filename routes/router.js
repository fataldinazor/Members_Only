const express = require("express");
const userRouter = express.Router();
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const homepageController = require("../controllers/homepageController");
const messageController = require("../controllers/messageController");

userRouter.get("/", homepageController);

userRouter.get("/sign-up", signupController.signupUserGet);
userRouter.post("/sign-up", signupController.signupUserPost);

userRouter.get("/log-in", loginController.loginUserGet);
userRouter.post("/log-in", loginController.loginUserPost);

userRouter.get('/messages', messageController.getAllMessages)
userRouter.get("/create-message", messageController.createMessageGet);
userRouter.post("/create-message", messageController.createMessagePost);

userRouter.get("/log-out", logoutController);

module.exports = userRouter;
