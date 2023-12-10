const express = require('express');
const conditionsController = require('../controllers/conditionsController');

var conditionsRouter = express.Router();
var conditions = new conditionsController();

conditionsRouter.get("/findAll", conditions.findAll);
conditionsRouter.post("", conditions.add);
conditionsRouter.put("/delete", conditions.delete);
conditionsRouter.put("", conditions.update);

module.exports = conditionsRouter;