const express = require('express');
const RolesController = require('../controllers/rolesController');

var RolesRouter = express.Router();
var roles = new RolesController();

RolesRouter.get("/findAll", roles.findAll);
RolesRouter.get("/findByID/:role_id", roles.findByID);
RolesRouter.post("", roles.add);
RolesRouter.delete("", roles.delete);
RolesRouter.put("",roles.update);

module.exports = RolesRouter;