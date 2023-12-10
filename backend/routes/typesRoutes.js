const express = require('express');
const typesController = require('../controllers/typesController');

var typesRouter = express.Router();
var types = new typesController();

typesRouter.get("/findAll", types.findAll);
typesRouter.post("", types.add);
typesRouter.put("/delete", types.delete);
typesRouter.put("", types.update);

module.exports = typesRouter;