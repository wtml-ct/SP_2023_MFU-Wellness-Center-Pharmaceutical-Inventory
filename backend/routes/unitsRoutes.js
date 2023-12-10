const express = require('express');
const unitsController = require('../controllers/unitsController');

var unitsRouter = express.Router();
var units = new unitsController();

unitsRouter.get("/findAll", units.findAll);
unitsRouter.post("", units.add);
unitsRouter.put("/delete", units.delete);
unitsRouter.put("", units.update);

module.exports = unitsRouter;