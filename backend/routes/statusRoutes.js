const express = require('express');
const statusController = require('../controllers/statusController');

var statusRouter = express.Router();
var status = new statusController();

statusRouter.get("/findAll", status.findAll);
statusRouter.post("", status.add);
statusRouter.put("/delete", status.delete);
statusRouter.put("", status.update);

module.exports = statusRouter;