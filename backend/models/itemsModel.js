const dbConn = require("./db.js");

// constructor
const Items = function (obj) {
    this.item_id = obj.item_id;
    this.item_name = obj.item_name;
    this.item_min = obj.item_min;
    this.item_max = obj.item_max;
    this.unit_id = obj.unit_id;
    this.type_id = obj.type_id;
    this.condition_id = obj.condition_id;
};

// find all items ---
Items.getAll = result => {
    dbConn.query(`SELECT items.*,units.unit_name,types.type_name,conditions.condition_name 
    FROM public.items,public.units,public.types,public.conditions 
    WHERE items.unit_id = units.unit_id 
    AND items.type_id = types.type_id 
    AND items.condition_id = conditions.condition_id`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res.rows);
    })
}

// find by item_id ---
Items.findByItemId = (id, result) => {
    console.log(id);
    dbConn.query(`SELECT items.*, units.unit_name, types.type_name, conditions.condition_name 
    FROM public.items, public.units, public.types, public.conditions 
    WHERE items.unit_id = units.unit_id 
    AND items.type_id = types.type_id 
    AND items.condition_id = conditions.condition_id 
    AND items.item_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count",res.rowCount);
        if (res.rowCount) {
            result(null, res.rows[0]);
            return;
        }
        result({ type: "not_found" }, null);
    });
};
// // find by item_name ---
Items.findByItemName = (id, result) => {
    console.log(id);
    dbConn.query(`SELECT items.*, units.unit_name, types.type_name, conditions.condition_name 
    FROM public.items, public.units, public.types, public.conditions 
    WHERE items.unit_id = units.unit_id 
    AND items.type_id = types.type_id 
    AND items.condition_id = conditions.condition_id 
    AND items.item_name = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count",res.rowCount);
        if (res.rowCount) {
            result(null, res.rows[0]);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

// find by type_id ---
Items.findByTypeId = (id, result) => {
    console.log(id);
    dbConn.query(`SELECT items.*, units.unit_name, types.type_name, conditions.condition_name 
    FROM public.items, public.units, public.types, public.conditions 
    WHERE items.unit_id = units.unit_id AND items.type_id = types.type_id 
    AND items.condition_id = conditions.condition_id 
    AND items.type_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
            result(null, res.rows);
    });
};
// create
Items.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    // key.splice(0,1)
    // values.splice(0,1)
    let key_insert = key.join(',')
    console.log("model: ",model);
    console.log("key_insert",key_insert);
    console.log("values",values);
    dbConn.query(`INSERT INTO public.items (${key_insert}) VALUES ($1,$2,$3,$4,$5,$6,$7)`,values,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// delete
Items.remove = (id, result) => {
    dbConn.query(`DELETE FROM public.items WHERE items.item_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }
        result(null, { id: id });
    });
};

// update
Items.updateById = (bodyData, result) => {
    var uSql = "UPDATE public.items SET ";
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "item_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0,uSql.lastIndexOf(","));
    uSql += `WHERE items.item_id = '${id}'`;
    console.log("id",id);
    dbConn.query(uSql,
     (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id});
    }
    );
};
module.exports = Items;