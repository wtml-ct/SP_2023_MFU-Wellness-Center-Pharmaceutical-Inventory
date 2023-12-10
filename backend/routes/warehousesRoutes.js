const express = require('express');
const warehousesController = require('../controllers/warehousesController');

var warehousesRouter = express.Router();
var warehouses = new warehousesController();

warehousesRouter.get("/findAll", warehouses.findAll);
warehousesRouter.post("", warehouses.add);
warehousesRouter.put("/delete", warehouses.delete);
warehousesRouter.put("", warehouses.update);

module.exports = warehousesRouter;