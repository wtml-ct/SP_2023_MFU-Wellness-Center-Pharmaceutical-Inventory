const Model = require("../models/itemsModel");

const tableName = "Items";
class ItemsController {

    //findAll
    async findAll(req, res, next) {
        Model.getAll((err, data) => {
            if (err) {
                res.status(500).send({ message: err.message || `some error occurred while retrieving ${tableName}.` })
            } else {
                console.log(`Start get all ${tableName} action`);
                res.send(data);
            }
        });
    }
    //findByItemID
    async findByItemID(req, res, next) {
        var id = req.params.item_id;
        console.log(`Start get ${tableName} by id with id: ${id}`)
        Model.findByItemId(id, (err, data) => {
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
       //findByItemName
       async findByItemName(req, res, next) {
        var id = req.params.item_name;
        console.log(`Start get ${tableName} by id with id: ${id}`)
        Model.findByItemName(id, (err, data) => {
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
    //findByTypeId
    async findByTypeId(req, res, next) {
        var id = req.params.type_id;
        console.log(`Start get ${tableName} by id with id: ${id}`)
        Model.findByTypeId(id, (err, data) => {
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
        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        const newData = new Model({
            item_id : req.body.item_id,
            item_name : req.body.item_name,
            item_min : req.body.item_min,
            item_max : req.body.item_max,
            unit_id : req.body.unit_id,
            type_id : req.body.type_id,
            condition_id : req.body.condition_id,
        });
        // Save to database
        Model.create(newData, (err, data) => {
            console.log(`Start create ${tableName}`);
            if (err){
                var errStr = err.message || `Some error occurred while creating the ${tableName}`;
                console.log(`Create ${tableName} failed: ${errStr}`);
                res.status(500).send({ message: errStr });
            }else{
                var resStr = `Add ${tableName} successful , id: ${data.id}`;
                console.log(resStr);
                res.send({ message: resStr});
            }
        });

    }
    // delete
    async delete(req, res, next) {
        // Validate request
        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        var id = req.body.item_id;
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
                res.status(errStatus).send({message: errStr});
            }else{
                var resStr = `Delete ${tableName} successful , id: ${id}`;
                console.log(resStr);
                res.send({message: resStr});
            }
        }
        );
    }

    //update
    async update(req, res, next) {
        console.log(req.body);
        // Validate request
        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }
        var bodyData = Object.entries(req.body).map(([key, value]) => ({key,value,}));
        var id = req.body.item_id;
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
                res.status(errStatus).send({message: errStr});
            } else {
                var resStr = `Update ${tableName} successful , id: ${id}`;
                console.log(resStr);
                res.send({message: resStr});
            }
        });
    }

}
module.exports = ItemsController;