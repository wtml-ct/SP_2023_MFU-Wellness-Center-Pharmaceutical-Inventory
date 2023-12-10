const dbConn = require('./db.js');

// Constructor

const Roles = function (obj) {
    this.role_id = obj.role_id;
    this.role_name = obj.role_name;
};

// Find all roles ---
Roles.getAll = result => {
    dbConn.query(`SELECT role_id, role_name FROM public.roles`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res.rows);
    });
};

// Find by role_id ---
Roles.findById = (id, result) => {
    dbConn.query(`SELECT roles.* FROM public.roles WHERE roles.role_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rowCount) {
            result(null, res.rows[0]);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

// create
Roles.create = (model, result) => {
    dbConn.query("INSERT INTO roles SET ?", model, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId });
    });
};

// delete
Roles.remove = (id, result) => {
    dbConn.query("DELETE FROM roles WHERE role_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // not found with the id
            result({ type: "not_found" }, null);
            return;
        }
        result(null, { id: id });
    });
};

// update
Roles.updateById = (bodyData, result) => {
    var uSql = "UPDATE roles SET ";
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "role_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += " WHERE id = ?";
    dbConn.query(uSql, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // not found with the id
            result({ type: "not_found" }, null);
            return;
        }
        result(null, { id: id });
    }
    );
};

module.exports = Roles;