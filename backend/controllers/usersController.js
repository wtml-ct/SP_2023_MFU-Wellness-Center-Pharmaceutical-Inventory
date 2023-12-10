const Model = require("../models/usersModel");
const { password_hash, password_verify, generateAccessToken } = require('../security')

const tableName = "Users";
class UsersController {
    
    //findAll
    async findAll(req, res, next) {
        Model.getAll((err, data) => {
            if (err) {
                res.status(500).send({ message: err.message || `some error occurred while retrieving ${tableName}.` });
            } else {
                console.log(`Start get all ${tableName} action`);
                res.send(data);
            }
        });
    }


    //findByID
    async findByID(req, res, next) {
        var id = req.params.user_id;
        console.log(`Start get ${tableName} by id with id: ${id}`)
        Model.findById(id, (err, data) => {
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
    //findUsername
    async findUserName(req, res, next) {
        var username = req.params.username;
        console.log(username);
        console.log(`Start get ${tableName} with username: ${username}`)
        Model.findUserName(username, (err, data) => {
            if (err) {
                var errStr = "";
                var errStatus = 500;
                if (err.type === "not_found") {
                    errStr = `Not found ${tableName} with username: ${username}`;
                    errStatus = 404;
                } else {
                    errStr = `Error retrieving ${tableName} with username: ${username}`;
                }
                console.log(`Get ${tableName} by username failed: ${errStr}`);
                res.status(errStatus).send({ message: errStr });
            } else {
                console.log(`Get ${tableName} by username successful , username: ${username}`)
                res.send(data);
            }
        });
    }
      //findByRoleID
      async findByRoleID(req, res, next) {
        var id = req.params.role_id;
        console.log(`Start get ${tableName} by id with id: ${id}`)
        Model.findByRoleID(id, (err, data) => {
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
            user_id: req.body.user_id,
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            role_id: req.body.role_id,
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
        var id = req.body.username;
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
        var id = req.body.user_id;
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
    // login by username & password
    async login(req, res, next) {
        var value = req.body
        var username = value.username;
        var password = value.password;
        Model.login(username, password, (err, data) => {
            if (err) {
                if (err.type === "not_found") {
                    res.status(404).send({
                        message: `Not found user with username: ${username}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error retrieving user with username: ${username}`
                    });
                }
            } else {
                console.log(`Running user login action. username: ${username}`);
                data.token = generateAccessToken(data);
                res.send(data);
            }
        });
    }
}
module.exports = UsersController;