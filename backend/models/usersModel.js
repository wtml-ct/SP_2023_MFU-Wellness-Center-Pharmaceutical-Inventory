const dbConn = require("./db.js");

// constructor
const Users = function (obj) {
    this.user_id = obj.user_id;
    this.username = obj.username;
    this.password = obj.password;
    this.name = obj.name;
    this.role_id = obj.role_id;
};

// login ---
Users.login = (username, password, result) => {
    dbConn.query(`SELECT users.*,roles.role_name FROM public.users, public.roles WHERE users.role_id = roles.role_id AND users.username = '${username}' and users.password = '${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.rowCount) {
            result(null, res.rows[0]);
            return;
        }
        result({ type: "not_found" }, null);
    });
}

// find all ---
Users.getAll = result => {
    dbConn.query(`SELECT
        users.*,
        roles.role_name,
        warehouses.warehouse_name
    FROM
        public.users
    JOIN
        public.roles ON users.role_id = roles.role_id
    LEFT JOIN
        public.warehouses ON users.warehouse = warehouses.warehouse_id;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res.rows);
    });
};

// find by id ---
Users.findById = (id, result) => {
    dbConn.query(`SELECT users.*,roles.role_name FROM public.users, public.roles WHERE users.role_id = roles.role_id AND users.user_id = ${id}`, (err, res) => {
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

// find by role_id ---
Users.findByRoleID = (id, result) => {
    console.log(id);
    dbConn.query(`SELECT
        users.*,
        roles.role_name,
        warehouses.warehouse_name
    FROM
        public.users
    JOIN
        public.roles ON users.role_id = roles.role_id
    LEFT JOIN
        public.warehouses ON users.warehouse = warehouses.warehouse_id
    WHERE
    roles.role_id = ${id}`
, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
            result(null, res.rows);
    });
};

// find by username ---
Users.findUserName = (username, result) => {
    console.log(username);
    dbConn.query(`SELECT users.*,roles.role_name FROM public.users, public.roles WHERE users.role_id = roles.role_id AND users.username = '${username}'`, (err, res) => {
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
Users.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    // key.splice(0, 1)
    // values.splice(0, 1)
    let key_insert = key.join(',')
    console.log("model: ",model);
    console.log("key_insert",key_insert);
    console.log("values",values);
    dbConn.query(`INSERT INTO public.users (${key_insert}) VALUES ($1,$2,$3,$4,$5)`, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
// delete
Users.remove = (id, result) => {
    dbConn.query(`DELETE FROM public.users WHERE users.username = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    });
};
// update
Users.updateById = (bodyData, result) => {
    var uSql = `UPDATE public.users SET `;
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "user_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += ` WHERE user_id = '${id}'`;
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

module.exports = Users;