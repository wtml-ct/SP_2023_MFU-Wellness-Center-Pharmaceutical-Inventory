const Model = require("../models/unitsModel");

const tableName = "Units";
class UnitsController {

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
    // create
    async add(req, res, next) {
        // Validate request
        // let passh = password_hash(req.body.password)

        if (Object.keys(req.body).length == 0) {
            res.status(400).send({ message: "Content can not be empty!" });
            return
        }

        const newData = new Model({
            unit_id: req.body.unit_id,
            unit_name: req.body.unit_name,
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
        var id = req.body.unit_id;
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
        var id = req.body.unit_id;
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
module.exports = UnitsController;