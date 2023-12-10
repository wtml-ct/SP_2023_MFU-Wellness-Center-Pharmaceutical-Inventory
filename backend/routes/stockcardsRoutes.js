const express = require('express');
const stockcardsController = require('../controllers/stockcardsController');

var stockcardsRouter = express.Router();
var stockcards = new stockcardsController();

stockcardsRouter.get("/findAll", stockcards.findAll);
stockcardsRouter.get("/findByActions/:action_id", stockcards.findByActions);


stockcardsRouter.get("/findByItemID/:item_id", stockcards.findByItemID);
stockcardsRouter.get("/findByItemIDandLot/:item_id/:sc_lot", stockcards.findByItemIDandLot);
stockcardsRouter.get("/findByItemIDandLotandExp/:item_id/:sc_lot/:sc_exp", stockcards.findByItemIDandLot);
stockcardsRouter.get("/findinStockBalance/:wh/:item_id/:sc_lot/:sc_exp", stockcards.findinStockBalance);

stockcardsRouter.get("/findOutstock", stockcards.findOutstock);
stockcardsRouter.get("/findExpire", stockcards.findExpire);
stockcardsRouter.get("/findinStock/:wh", stockcards.findinStock);
stockcardsRouter.get("/findHistotybywh/:wh", stockcards.findHistotybywh);
stockcardsRouter.get("/findOutstockBywh/:to_warehouse", stockcards.findOutstockBywh);
stockcardsRouter.get("/findHistotybywhanditemid/:wh/:item_id", stockcards.findHistotybywhanditemid);

stockcardsRouter.get("/findExpirebywh/:wh", stockcards.findExpirebywh);



stockcardsRouter.post("/", stockcards.add);
stockcardsRouter.put("/delete", stockcards.delete);
stockcardsRouter.put("/", stockcards.update);

module.exports = stockcardsRouter;