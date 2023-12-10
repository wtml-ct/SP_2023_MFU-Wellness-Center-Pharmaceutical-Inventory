const dbConn = require('./db.js');

// constructor
const Conditions = function (obj) {
    this.condition_id = obj.condition_id;
    this.condition_name = obj.condition_name;
};

// fing all ---
Conditions.getAll = result => {
    dbConn.query(`SELECT * FROM public.conditions`, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return
        }
        result(null, res.rows);
    });
};

// create
Conditions.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    // key.splice(0, 1)
    // values.splice(0, 1)
    let key_insert = key.join(',')
    console.log("model: ", model);
    console.log("key_insert", key_insert);
    console.log("values", values);
    dbConn.query(`INSERT INTO public.conditions (${key_insert}) VALUES ($1,$2)`, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
// delete
Conditions.remove = (id, result) => {
    dbConn.query(`DELETE FROM public.conditions WHERE conditions.condition_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    });
};
// update
Conditions.updateById = (bodyData, result) => {
    var uSql = `UPDATE public.conditions SET `;
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "condition_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += ` WHERE condition_id = '${id}'`;
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

module.exports = Conditions;