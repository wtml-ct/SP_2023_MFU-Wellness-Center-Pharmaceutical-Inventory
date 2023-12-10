const Model = require("../models/stockcardsModel");

const tableName = "stockcards";
class StockcardsController {

    //findAll
    async findAll(req, res, next) {
        Model.getAll((err, data) => {
            if (err) {
                res.stat
            } else {
                console.log(`Start get all ${tableName} action`);
                res.send(data);
            }
        })
    }

    //findByItemID
    async findByItemID(req, res, next) {
        var id = req.params.item_id;
        console.log(`Start get ${tableName} by id with id: ${id}`)
        Model.findByItemID(id, (err, data) => {
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with id: ${id}`;
                    errStatus = 404;
                } else {
                    errStr = `Error retrieving ${tableName} with id: ${id}`;
                }
                console.log(`Get ${tableName} by id failed: ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                console.log(`Get ${tableName} by id successful , id: ${id}`)
                res.send(data);
            }
        });
    }

    // Find out stock
    async findOutstock(req, res, next) {
        Model.findOutstock((err, data) => {
            if (err) {
                res.stat
            } else {
                console.log(`Start get all ${tableName} action`);
                res.send(data);
            }
        });
    }

  //findinStock
  async findOutstockBywh(req, res, next) {
    var wh = req.params.to_warehouse;
    console.log(`Start get ${tableName} by wh with wh: ${wh} `);
    Model.findOutstockBywh(wh, (err, data) => {
        if (err) {
            var errStr = "";
            var errStatus = 500;
            if (err.type === "not_found") {
                errStr = `Not found ${tableName} with wh: ${wh} ไม่มีข้อมูล`;
                errStatus = 404;
            } else {
                errStr = `Error retrieving ${tableName} with  wh: ${wh}`;
            }
            console.log(`Get ${tableName} by id failed: ${errStr}`);
            res.status(errStatus).send({ message: errStr });
        } else {
            console.log(`Get ${tableName} by id successful , wh: ${wh}`)
            res.send(data);
        }
    });
}

  // Find findExpire
  async findExpire(req, res, next) {
    Model.findExpire((err, data) => {
        if (err) {
            res.stat
        } else {
            console.log(`Start get all ${tableName} action`);
            res.send(data);
        }
    });
}

// findinStockBalance
async findinStockBalance(req, res, next) {
    var wh = req.params.wh;
    var id = req.params.item_id;
    var lot = req.params.sc_lot;
    var exp = req.params.sc_exp;
    console.log(`Start get ${tableName} by wh with wh: ${wh} `);
    Model.findinStockBalance({wh,id,lot,exp}, (err, data) => {
        if (err) {
            var errStr = "";
            var errStatus = 500;
            if (err.type === "not_found") {
                errStr = `Not found ${tableName} with wh: ${wh} ไม่มีข้อมูล`;
                errStatus = 404;
            } else {
                errStr = `Error retrieving ${tableName} with  wh: ${wh}`;
            }
            console.log(`Get ${tableName} by id failed: ${errStr}`);
            res.status(errStatus).send({ message: errStr });
        } else {
            console.log(`Get ${tableName} by id successful , wh: ${wh}`)
            res.send(data);
        }
    });
}
  //findinStock
  async findinStock(req, res, next) {
    var wh = req.params.wh;
    console.log(`Start get ${tableName} by wh with wh: ${wh} `);
    Model.findinStock(wh, (err, data) => {
        if (err) {
            var errStr = "";
            var errStatus = 500;
            if (err.type === "not_found") {
                errStr = `Not found ${tableName} with wh: ${wh} ไม่มีข้อมูล`;
                errStatus = 404;
            } else {
                errStr = `Error retrieving ${tableName} with  wh: ${wh}`;
            }
            console.log(`Get ${tableName} by id failed: ${errStr}`);
            res.status(errStatus).send({ message: errStr });
        } else {
            console.log(`Get ${tableName} by id successful , wh: ${wh}`)
            res.send(data);
        }
    });
}
  //findinStock
  async findExpirebywh(req, res, next) {
    var wh = req.params.wh;
    console.log(`Start get ${tableName} by wh with wh: ${wh} `);
    Model.findExpirebywh(wh, (err, data) => {
        if (err) {
            var errStr = "";
            var errStatus = 500;
            if (err.type === "not_found") {
                errStr = `Not found ${tableName} with wh: ${wh} ไม่มีข้อมูล`;
                errStatus = 404;
            } else {
                errStr = `Error retrieving ${tableName} with  wh: ${wh}`;
            }
            console.log(`Get ${tableName} by id failed: ${errStr}`);
            res.status(errStatus).send({ message: errStr });
        } else {
            console.log(`Get ${tableName} by id successful , wh: ${wh}`)
            res.send(data);
        }
    });
}

  //findinStock
  async findHistotybywh(req, res, next) {
    var wh = req.params.wh;
    console.log(`Start get ${tableName} by wh with wh: ${wh} `);
    Model.findHistotybywh(wh, (err, data) => {
        if (err) {
            var errStr = "";
            var errStatus = 500;
            if (err.type === "not_found") {
                errStr = `Not found ${tableName} with wh: ${wh} ไม่มีข้อมูล`;
                errStatus = 404;
            } else {
                errStr = `Error retrieving ${tableName} with  wh: ${wh}`;
            }
            console.log(`Get ${tableName} by id failed: ${errStr}`);
            res.status(errStatus).send({ message: errStr });
        } else {
            console.log(`Get ${tableName} by id successful , wh: ${wh}`)
            res.send(data);
        }
    });
}

// findHistotybywhanditemid
async findHistotybywhanditemid(req, res, next) {
    var wh = req.params.wh;
    var id = req.params.item_id;
    console.log(`Start get ${tableName} by wh with wh: ${wh} `);
    Model.findHistotybywhanditemid({wh,id}, (err, data) => {
        if (err) {
            var errStr = "";
            var errStatus = 500;
            if (err.type === "not_found") {
                errStr = `Not found ${tableName} with wh: ${wh} ไม่มีข้อมูล`;
                errStatus = 404;
            } else {
                errStr = `Error retrieving ${tableName} with  wh: ${wh}`;
            }
            console.log(`Get ${tableName} by id failed: ${errStr}`);
            res.status(errStatus).send({ message: errStr });
        } else {
            console.log(`Get ${tableName} by id successful , wh: ${wh}`)
            res.send(data);
        }
    });
}



    //findByItemID and Lot
    async findByItemIDandLot(req, res, next) {
        var id = req.params.item_id;
        var lot = req.params.sc_lot;
        console.log(`Start get ${tableName} by id with id: ${id} and lot: ${lot}`);
        Model.findByItemIDandLot({ id, lot }, (err, data) => {
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with id: ${id}`;
                    errStatus = 404;
                } else {
                    errStr = `Error retrieving ${tableName} with id: ${id} and lot: ${lot}`;
                }
                console.log(`Get ${tableName} by id failed: ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                console.log(`Get ${tableName} by id successful , id: ${id}`)
                res.send(data);
            }
        });
    }

    //findByItemIDandLotandExp
    async findByItemIDandLotandExp(req, res, next) {
        var id = req.params.item_id;
        var lot = req.params.sc_lot;
        var exp = req.params.sc_exp;
        console.log(`Start get ${tableName} by id with id: ${id} and lot: ${lot}`);
        Model.findByItemIDandLotandExp({ id, lot, exp }, (err, data) => {
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with id: ${id}`;
                    errStatus = 404;
                } else {
                    errStr = `Error retrieving ${tableName} with id: ${id} and lot: ${lot}`;
                }
                console.log(`Get ${tableName} by id failed: ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                console.log(`Get ${tableName} by id successful , id: ${id}`)
                res.send(data);
            }
        });
    }

    //findByActions
    async findByActions(req, res, next) {
        var id = req.params.action_id;
        console.log(`Start get ${tableName} by id with action id: ${id}`)
        Model.findByActions(id, (err, data) => {
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with id: ${id}`;
                    errStatus = 404;
                } else {
                    errStr = `Error retrieving ${tableName} with id: ${id}`;
                }
                console.log(`Get ${tableName} by id failed: ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                console.log(`Get ${tableName} by id successful , id: ${id}`)
                res.send(data);
            }
        });
    }


    // create
    async add(req, res, next) {
        // Validate request
        // let passh = password_hash(req.body.password)

        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }

        const newData = new Model({
            sc_id: req.body.sc_id,
            item_id: req.body.item_id,
            sc_lot: req.body.sc_lot,
            sc_exp: req.body.sc_exp,
            sc_import: req.body.sc_import,
            sc_po: req.body.sc_po,
            sc_delivery: req.body.sc_delivery,
            from_warehouse: req.body.from_warehouse,
            to_warehouse: req.body.to_warehouse,
            status_id: req.body.status_id,
            sc_price: req.body.sc_price,
            action_id: req.body.action_id,
            username: req.body.username,
            sc_balance: req.body.sc_balance,
            item_old: req.body.item_old,
            sc_balance_old: req.body.sc_balance_old,
            item_lot_old: req.body.item_lot_old,
            item_exp_old: req.body.item_exp_old
        });

        // Save to database
        Model.create(newData, (err, data) => {
            console.log(`Start create ${tableName}`);
            if (err) {
                var errStr = err.message || `Some error occurred while creating the ${tableName}`;
                console.log(`Create ${tableName} failed: ${errStr}`);
                res.status(500).send({ message: errStr });
            } else {
                var resStr = `Add ${tableName} successful`;
                console.log(resStr);
                res.send({ message: resStr });
            }
        });
    }
    // delete by id
    async delete(req, res, next) {
        // Validate request
        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        var id = req.body.sc_id;
        Model.remove(id, (err, data) => {
            console.log(`Start delete ${tableName} with id: ${id}`)
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with id: ${id}`;
                    errStatus = 404;
                } else {
                    errStr = `Error deleteing ${tableName} with id: ${id}`;
                }
                console.log(`Delete ${tableName} failed : ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                var resStr = `Delete ${tableName} successful , id: ${id}`;
                console.log(resStr);
                res.send({ message: resStr });
            }
        }
        );
    }
    //update
    async update(req, res, next) {
        // Validate request
        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        var bodyData = Object.entries(req.body).map(([key, value]) => ({ key, value, }));
        console.log("body", bodyData);
        var id = req.body.sc_id;
        Model.updateById(bodyData, (err, data) => {
            console.log(`Start update ${tableName} with id: ${id}`)
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with id: ${id}`;
                    errStatus = 404;
                } else {
                    errStr = `Error Updateing ${tableName} with id: ${id}`;
                }
                console.log(`Update ${tableName} failed : ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                var resStr = `Update ${tableName} successful , id: ${id}`;
                console.log(resStr);
                res.send({ message: resStr });
            }
        });
    }
}
module.exports = StockcardsController;