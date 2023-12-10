const express = require('express');
const actionsController = require('../controllers/actionsController');

var actionsRouter = express.Router();
var actions = new actionsController();

actionsRouter.get("/findAll", actions.findAll);
actionsRouter.post("", actions.add);
actionsRouter.put("/delete", actions.delete);
actionsRouter.put("", actions.update);

module.exports = actionsRouter;