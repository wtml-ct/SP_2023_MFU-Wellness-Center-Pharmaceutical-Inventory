const dbConn = require('./db.js');

// constructor
const Types = function (obj) {
    this.type_id = obj.type_id;
    this.type_name = obj.type_name;
};

// fing all ---
Types.getAll = result => {
    dbConn.query(`SELECT * FROM public.types`, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return
        }
        result(null, res.rows);
    });
};

// create
Types.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    // key.splice(0, 1)
    // values.splice(0, 1)
    let key_insert = key.join(',')
    console.log("model: ", model);
    console.log("key_insert", key_insert);
    console.log("values", values);
    dbConn.query(`INSERT INTO public.types (${key_insert}) VALUES ($1,$2)`, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
// delete
Types.remove = (id, result) => {
    dbConn.query(`DELETE FROM public.types WHERE types.type_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    });
};
// update
Types.updateById = (bodyData, result) => {
    var uSql = `UPDATE public.types SET `;
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "type_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += ` WHERE type_id = '${id}'`;
    console.log(uSql)
    dbConn.query(uSql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    }
    );
};

module.exports = Types;