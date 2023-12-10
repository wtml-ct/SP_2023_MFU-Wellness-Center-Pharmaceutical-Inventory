const express = require('express');
const usersController = require('../controllers/usersController');
const { authenticateToken, password_hashPost } = require('../security')

var usersRouter = express.Router();
var users = new usersController();

usersRouter.post("/login", users.login);
usersRouter.get("/getLogin", authenticateToken, (req, res) => {
    let user = req.user
    console.log(`Action get users : ${user.data.username}`);
    res.json(user)
});
usersRouter.get("/findAll", users.findAll);
usersRouter.get("/findByID/:user_id", users.findByID);
usersRouter.get("/findByRoleID/:role_id", users.findByRoleID)
usersRouter.post("/getPassword", password_hashPost)
// usersRouter.get("/findByEmail", users.findByEmail);
usersRouter.get("/findUsername/:username", users.findUserName);
usersRouter.post("", users.add);
usersRouter.put("/delete", users.delete);
usersRouter.put("", users.update);


module.exports = usersRouter;
