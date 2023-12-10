const express = require('express');
const itemsController = require('../controllers/itemsController');

var itemsRouter = express.Router();
var items = new itemsController();

itemsRouter.get("/findAll", items.findAll);
itemsRouter.get("/findByTypeId/:type_id", items.findByTypeId);
itemsRouter.get("/findByItemID/:item_id", items.findByItemID);
itemsRouter.get("/findByItemName/:item_name", items.findByItemName);
itemsRouter.post("", items.add);
itemsRouter.put("", items.update);
itemsRouter.put("/delete", items.delete);

module.exports = itemsRouter;