const dbConn = require('./db.js');

// constructor
const Status = function (obj) {
    this.status_id = obj.status_id;
    this.status_name = obj.status_name;
};

// fing all ---
Status.getAll = result => {
    dbConn.query(`SELECT * FROM public.status`, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return
        }
        result(null, res.rows);
    });
};

// create
Status.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    key.splice(0, 1)
    values.splice(0, 1)
    let key_insert = key.join(',')
    console.log("model: ", model);
    console.log("key_insert", key_insert);
    console.log("values", values);
    dbConn.query(`INSERT INTO public.status (${key_insert}) VALUES ($1)`, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
// delete
Status.remove = (id, result) => {
    dbConn.query(`DELETE FROM public.status WHERE status.status_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    });
};
// update
Status.updateById = (bodyData, result) => {
    var uSql = `UPDATE public.status SET `;
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "status_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += ` WHERE status_id = '${id}'`;
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

module.exports = Status;