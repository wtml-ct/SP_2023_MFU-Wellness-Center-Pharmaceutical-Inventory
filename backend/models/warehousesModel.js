const dbConn = require('./db.js');

// constructor
const Warehouses = function (obj) {
    this.warehouse_id = obj.warehouse_id;
    this.warehouse_name = obj.warehouse_name;
};

// fing all ---
Warehouses.getAll = result => {
    dbConn.query(`SELECT * FROM public.warehouses`, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return
        }
        result(null, res.rows);
    });
};

// create
Warehouses.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    // key.splice(0, 1)
    // values.splice(0, 1)
    let key_insert = key.join(',')
    console.log("model: ", model);
    console.log("key_insert", key_insert);
    console.log("values", values);
    dbConn.query(`INSERT INTO public.warehouses (${key_insert}) VALUES ($1,$2)`, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
// delete
Warehouses.remove = (id, result) => {
    dbConn.query(`DELETE FROM public.warehouses WHERE warehouses.warehouse_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    });
};
// update
Warehouses.updateById = (bodyData, result) => {
    var uSql = `UPDATE public.warehouses SET `;
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "warehouse_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += ` WHERE warehouse_id = '${id}'`;
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

module.exports = Warehouses;