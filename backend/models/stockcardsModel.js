const dbConn = require('./db.js');

// constructor
const Stockcards = function (obj) {
    this.sc_id = obj.sc_id;
    this.item_id = obj.item_id;
    this.sc_lot = obj.sc_lot;
    this.sc_exp = obj.sc_exp;
    this.sc_import = obj.sc_import;
    this.sc_po = obj.sc_po;
    this.sc_delivery = obj.sc_delivery;
    this.from_warehouse = obj.from_warehouse;
    this.to_warehouse = obj.to_warehouse;
    this.status_id = obj.status_id;
    this.sc_price = obj.sc_price;
    this.action_id = obj.action_id;
    this.username = obj.username;
    this.sc_balance = obj.sc_balance;
    this.item_old = obj.item_old;
    this.sc_balance_old = obj.sc_balance_old;
    this.item_lot_old = obj.item_lot_old;
    this.item_exp_old = obj.item_exp_old;
};

// fing all ---
Stockcards.getAll = result => {
    dbConn.query(`
    SELECT 
        stockcards.* ,
        T.item_name AS item_name,
        Wfrom.warehouse_name AS from_warehouse_name,
        Wfrom.warehouse_id AS from_warehouse,
        Told.item_name AS item_old_name,
        Told.item_id AS item_old,
        Wto.warehouse_name AS to_warehouse_name,
        Wto.warehouse_id AS to_warehouse,
        units.unit_name,
        types.type_name,
        unitsOld.unit_name AS unit_old_name,
        typesOld.type_name AS type_old_name
    FROM 
        public.warehouses AS Wfrom,
        public.warehouses AS Wto,
        public.stockcards
        LEFT JOIN public.items AS Told ON stockcards.item_old = Told.item_id
        INNER JOIN public.items AS T ON stockcards.item_id = T.item_id 
        INNER JOIN public.units ON T.unit_id = units.unit_id
        INNER JOIN public.types ON T.type_id = types.type_id
        -- Add these additional joins for item_old
        LEFT JOIN public.units AS unitsOld ON Told.unit_id = UnitsOld.unit_id
        LEFT JOIN public.types AS typesOld ON Told.type_id = TypesOld.type_id
    WHERE 
        stockcards.from_warehouse = Wfrom.warehouse_id
        AND stockcards.to_warehouse = Wto.warehouse_id
    ORDER BY
        stockcards.timestamp ASC;`, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return
        }
        result(null, res.rows);
    });
};

// find by action_id ---
Stockcards.findByActions = (id, result) => {
    console.log(id);
    dbConn.query(`
    SELECT 
        stockcards.* ,
        T.item_name AS item_name,
        Wfrom.warehouse_name AS from_warehouse_name,
        Wfrom.warehouse_id AS from_warehouse,
        Told.item_name AS item_old_name,
        Told.item_id AS item_old,
        Wto.warehouse_name AS to_warehouse_name,
        Wto.warehouse_id AS to_warehouse,
        units.unit_name,
        types.type_name,
        unitsOld.unit_name AS unit_old_name,
        typesOld.type_name AS type_old_name
    FROM 
        public.warehouses AS Wfrom,
        public.warehouses AS Wto,
        public.stockcards
        LEFT JOIN public.items AS Told ON stockcards.item_old = Told.item_id
        INNER JOIN public.items AS T ON stockcards.item_id = T.item_id 
        INNER JOIN public.units ON T.unit_id = units.unit_id
        INNER JOIN public.types ON T.type_id = types.type_id
        -- Add these additional joins for item_old
        LEFT JOIN public.units AS unitsOld ON Told.unit_id = UnitsOld.unit_id
        LEFT JOIN public.types AS typesOld ON Told.type_id = TypesOld.type_id
    WHERE 
        stockcards.from_warehouse = Wfrom.warehouse_id
        AND stockcards.to_warehouse = Wto.warehouse_id
        AND stockcards.action_id =  ${id}
    ORDER BY
        stockcards.sc_id ASC;` , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res.rows);
    });
};



// find by item_id ---
Stockcards.findByItemID = (id, result) => {
    console.log(id);
    dbConn.query(`
    SELECT  
        stockcards.* ,
        T.item_name AS item_name,
        Wfrom.warehouse_name AS from_warehouse_name,
        Wfrom.warehouse_id AS from_warehouse,
        Told.item_name AS item_old_name,
        Told.item_id AS item_old,
        Wto.warehouse_name AS to_warehouse_name,
        Wto.warehouse_id AS to_warehouse,
        units.unit_name,
        types.type_name
    FROM 
        public.warehouses AS Wfrom,
        public.warehouses AS Wto,
        public.stockcards
        LEFT JOIN public.items AS Told ON stockcards.item_old = Told.item_id
        INNER JOIN public.items AS T ON stockcards.item_id = T.item_id 
        INNER JOIN public.units ON T.unit_id = units.unit_id
        INNER JOIN public.types ON T.type_id = types.type_id
    WHERE
        stockcards.from_warehouse = Wfrom.warehouse_id
        AND stockcards.to_warehouse = Wto.warehouse_id
        AND stockcards.item_id = '${id}'
    ORDER BY
        stockcards.sc_lot`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

//findOutstock
Stockcards.findOutstock = result => {
    dbConn.query(`
    SELECT
        subquery.*
    FROM
    (
        SELECT
        items.*,
        units.unit_name,
        types.type_name,
        COALESCE (
        SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
        0 
        ) AS total_balance,
    CASE
            WHEN COALESCE (
            SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
            0 
            ) <= items.item_min THEN
            1 ELSE 0 
        END AS input_status 
    FROM
        PUBLIC.items
        JOIN PUBLIC.stockcards ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON items.condition_id = conditions.condition_id 
    WHERE
        stockcards.status_id = 1 
    GROUP BY
        items.item_id,
        items.item_min,
        units.unit_name,
        types.type_name
        ) AS subquery			
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

//findOutstock
Stockcards.findOutstockBywh = (wh,result) => {
    dbConn.query(`
    SELECT
        subquery.*,
        CASE 
        WHEN subquery.days_until_expire <= 90 AND subquery.days_until_expire > 0 AND subquery.condition_id = 1 THEN 1
        WHEN subquery.days_until_expire <= 90 AND subquery.days_until_expire > 0 AND subquery.condition_id = 2 THEN 1
        WHEN subquery.days_until_expire <= 60 AND subquery.days_until_expire > 0 AND subquery.condition_id = 3 THEN 1
        WHEN subquery.days_until_expire <= 30 AND subquery.days_until_expire > 0 AND subquery.condition_id = 4 THEN 1
        WHEN subquery.days_until_expire >= 90 AND subquery.condition_id = 1 THEN 0
        WHEN subquery.days_until_expire >= 90 AND subquery.condition_id = 2 THEN 0
        WHEN subquery.days_until_expire >= 60 AND subquery.condition_id = 3 THEN 0
        WHEN subquery.days_until_expire >= 30 AND subquery.condition_id = 4 THEN 0	
        ELSE 2
    END AS expire_status
    FROM
    (
        SELECT
        items.*,
        units.unit_name,
        types.type_name,
        stockcards.sc_lot,
        stockcards.sc_exp,
        ( stockcards.sc_exp :: DATE - CURRENT_DATE ) AS days_until_expire,
        COALESCE (
        SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
        0 
        ) AS total_balance,
    CASE
            
            WHEN COALESCE (
            SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
            0 
            ) <= items.item_min THEN
            1 ELSE 0 
        END AS input_status 
    FROM
        PUBLIC.items
        JOIN PUBLIC.stockcards ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON items.condition_id = conditions.condition_id 
    WHERE
        stockcards.status_id = 1 
        AND stockcards.to_warehouse = '${wh}'
    GROUP BY
        items.item_id,
        items.item_min,
        units.unit_name,
        types.type_name,
        stockcards.sc_exp,
        stockcards.sc_lot 
) AS subquery						
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

// findinStock ---
Stockcards.findinStock = (wh, result) => {
    console.log(wh);
    dbConn.query(`
    SELECT
        items.*,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp,
        (stockcards.sc_exp::DATE - CURRENT_DATE) AS days_until_expire,
        COALESCE (
            SUM(CASE WHEN stockcards.sc_id LIKE 'IM%' THEN stockcards.sc_balance ELSE 0 END) - SUM(CASE WHEN stockcards.sc_id LIKE 'TF%' THEN stockcards.sc_balance ELSE 0 END),
            0
        ) AS total_balance 
    FROM
        PUBLIC.items
        JOIN PUBLIC.stockcards ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON conditions.condition_id = items.condition_id
    WHERE
        stockcards.status_id = 1 
        AND (
            (stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE 'TF%') 
            OR (stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE 'IM%')
        ) 
    GROUP BY
        items.item_id,
        items.item_min,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp 
    HAVING
        COALESCE (
            SUM(CASE WHEN stockcards.sc_id LIKE 'IM%' THEN stockcards.sc_balance ELSE 0 END) - SUM(CASE WHEN stockcards.sc_id LIKE 'TF%' THEN stockcards.sc_balance ELSE 0 END),
            0
        ) <> 0
    ORDER BY
        items.item_id ASC;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

Stockcards.findinStockBalance = ({wh,id,lot,exp}, result) => {
    console.log(wh);
    dbConn.query(`
    SELECT
        items.*,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp,
        ( stockcards.sc_exp :: DATE - CURRENT_DATE ) AS days_until_expire,
        COALESCE (
        SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
        0 
        ) AS total_balance 
    FROM
        PUBLIC.items
        JOIN PUBLIC.stockcards ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON conditions.condition_id = items.condition_id 
    WHERE
        stockcards.status_id = 1 
        AND (
            ( stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE'TF%' ) 
            OR ( stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE'IM%' ) 
        ) 
        AND stockcards.sc_lot = '${lot}'
        AND stockcards.sc_exp = '${exp}'
        AND items.item_id = '${id}'
    GROUP BY
        items.item_id,
        items.item_min,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp
    HAVING
        COALESCE (
        SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
        0 
        ) <> 0 
    ORDER BY
        items.item_id ASC;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

//findExpire
Stockcards.findExpire = result => {
    dbConn.query(`
    SELECT
        subquery.*,
        CASE 
            WHEN subquery.days_until_expire <= 90 AND subquery.days_until_expire > 0 AND subquery.condition_id = 1 THEN 1
            WHEN subquery.days_until_expire <= 90 AND subquery.days_until_expire > 0 AND subquery.condition_id = 2 THEN 1
            WHEN subquery.days_until_expire <= 60 AND subquery.days_until_expire > 0 AND subquery.condition_id = 3 THEN 1
            WHEN subquery.days_until_expire <= 30 AND subquery.days_until_expire > 0 AND subquery.condition_id = 4 THEN 1
            WHEN subquery.days_until_expire >= 90 AND subquery.condition_id = 1 THEN 0
            WHEN subquery.days_until_expire >= 90 AND subquery.condition_id = 2 THEN 0
            WHEN subquery.days_until_expire >= 60 AND subquery.condition_id = 3 THEN 0
            WHEN subquery.days_until_expire >= 30 AND subquery.condition_id = 4 THEN 0	
            ELSE 2
        END AS expire_status
    FROM (
        SELECT
            items.*,
            units.unit_name,
            types.type_name,
            stockcards.sc_exp,
            stockcards.sc_lot,
            conditions.condition_name,
            (stockcards.sc_exp::date - CURRENT_DATE) AS days_until_expire,
            COALESCE(
                SUM(CASE WHEN stockcards.sc_id LIKE 'IM%' THEN stockcards.sc_balance ELSE 0 END) -
                SUM(CASE WHEN stockcards.sc_id LIKE 'TF%' THEN stockcards.sc_balance ELSE 0 END),
                0
            ) AS total_balance
        FROM 
            public.items
        JOIN
            public.stockcards ON items.item_id = stockcards.item_id
        JOIN
            public.units ON units.unit_id = items.unit_id
        JOIN
            public.types ON types.type_id = items.type_id
        JOIN
            public.conditions ON items.condition_id = conditions.condition_id
        WHERE
            stockcards.status_id = 1
        GROUP BY
            items.item_id, items.item_min, units.unit_name, types.type_name, stockcards.sc_exp, stockcards.sc_lot,  conditions.condition_name
        HAVING
            COALESCE(
                SUM(CASE WHEN stockcards.sc_id LIKE 'IM%' THEN stockcards.sc_balance ELSE 0 END) -
                SUM(CASE WHEN stockcards.sc_id LIKE 'TF%' THEN stockcards.sc_balance ELSE 0 END),
                0
            ) <> 0
    ) AS subquery
    ORDER BY
        days_until_expire ASC;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

//findExpirebywh
Stockcards.findExpirebywh = (wh, result) => {
    dbConn.query(`
    SELECT
    subquery.*,
    CASE 
        WHEN subquery.days_until_expire <= 90 AND subquery.days_until_expire > 0 AND subquery.condition_id = 1 THEN 1
        WHEN subquery.days_until_expire <= 90 AND subquery.days_until_expire > 0 AND subquery.condition_id = 2 THEN 1
        WHEN subquery.days_until_expire <= 60 AND subquery.days_until_expire > 0 AND subquery.condition_id = 3 THEN 1
        WHEN subquery.days_until_expire <= 30 AND subquery.days_until_expire > 0 AND subquery.condition_id = 4 THEN 1
        WHEN subquery.days_until_expire >= 90 AND subquery.condition_id = 1 THEN 0
        WHEN subquery.days_until_expire >= 90 AND subquery.condition_id = 2 THEN 0
        WHEN subquery.days_until_expire >= 60 AND subquery.condition_id = 3 THEN 0
        WHEN subquery.days_until_expire >= 30 AND subquery.condition_id = 4 THEN 0	
        ELSE 2
    END AS expire_status
    FROM (
        SELECT
        items.*,
        units.unit_name,
        types.type_name,
        stockcards.sc_exp,
        stockcards.sc_lot,
        conditions.condition_name,
        ( stockcards.sc_exp :: DATE - CURRENT_DATE ) AS days_until_expire,
        COALESCE (
        SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
        0 
        ) AS total_balance 
    FROM
        PUBLIC.items
        JOIN PUBLIC.stockcards ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON conditions.condition_id = items.condition_id 
    WHERE
        stockcards.status_id = 1 
        AND (
            ( stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE'TF%' ) 
            OR ( stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE'IM%' ) 
        ) 
    GROUP BY
        items.item_id,
        items.item_min,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp 
    HAVING
        COALESCE (
        SUM ( CASE WHEN stockcards.sc_id LIKE'IM%' THEN stockcards.sc_balance ELSE 0 END ) - SUM ( CASE WHEN stockcards.sc_id LIKE'TF%' THEN stockcards.sc_balance ELSE 0 END ),
        0 
        ) <> 0 
        ) AS subquery
    ORDER BY
        days_until_expire ASC;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

//findExpirebywh
Stockcards.findHistotybywh = (wh, result) => {
    dbConn.query(`
    SELECT
        stockcards.sc_id,
        items.item_id,
        items.item_name,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp,
        stockcards.timestamp,
        to_warehouse.warehouse_name AS to_warehouse_name,
        from_warehouse.warehouse_name AS from_warehouse_name,
        (stockcards.sc_exp::DATE - CURRENT_DATE) AS days_until_expire,
        stockcards.sc_balance,
        CASE
            WHEN stockcards.sc_id LIKE 'IM%' THEN 'IN'
            WHEN stockcards.sc_id LIKE 'TF%' THEN 'OUT'
            ELSE 'UNKNOWN'
        END AS transaction_type,
        CASE
            WHEN stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE 'IM%' THEN 'DESTINATION'
            WHEN stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE 'TF%' THEN 'SOURCE'
            ELSE 'UNKNOWN'
        END AS transaction_location
    FROM
        PUBLIC.stockcards
        JOIN PUBLIC.items ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON conditions.condition_id = items.condition_id
        JOIN PUBLIC.warehouses AS to_warehouse ON to_warehouse.warehouse_id = stockcards.to_warehouse
        JOIN PUBLIC.warehouses AS from_warehouse ON from_warehouse.warehouse_id = stockcards.from_warehouse
    WHERE
        (stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE 'IM%') OR
        (stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE 'TF%')
    ORDER BY
    stockcards.timestamp ASC;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};
// find balance exchange
Stockcards.findinBalanceExchange = ({wh,id,lot,exp}, result) => {
    console.log(wh);
    dbConn.query(`
    SELECT  
        stockcards.* 
    FROM 
        public.stockcards
    WHERE
        stockcards.item_id = '${id}'
        AND stockcards.sc_lot = '${lot}'
        AND stockcards.sc_exp = '${exp}'
        AND stockcards.from_warehouse = '${wh}'
    ORDER BY
        stockcards.sc_lot
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

// find by findHistotybywhanditemid ---
Stockcards.findHistotybywhanditemid = ({ id, wh }, result) => {
    console.log(id);
    dbConn.query(`
    SELECT
        stockcards.sc_id,
        items.item_id,
        items.item_name,
        units.unit_name,
        types.type_name,
        conditions.condition_name,
        stockcards.sc_lot,
        stockcards.sc_exp,
        stockcards.timestamp,
        to_warehouse.warehouse_name AS to_warehouse_name,
        from_warehouse.warehouse_name AS from_warehouse_name,
        (stockcards.sc_exp::DATE - CURRENT_DATE) AS days_until_expire,
        stockcards.sc_balance,
        CASE
            WHEN stockcards.sc_id LIKE 'IM%' THEN 'IN'
            WHEN stockcards.sc_id LIKE 'TF%' THEN 'OUT'
            ELSE 'UNKNOWN'
        END AS transaction_type,
        CASE
            WHEN stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE 'IM%' THEN 'DESTINATION'
            WHEN stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE 'TF%' THEN 'SOURCE'
            ELSE 'UNKNOWN'
        END AS transaction_location
    FROM
        PUBLIC.stockcards
        JOIN PUBLIC.items ON items.item_id = stockcards.item_id
        JOIN PUBLIC.units ON units.unit_id = items.unit_id
        JOIN PUBLIC.types ON types.type_id = items.type_id
        JOIN PUBLIC.conditions ON conditions.condition_id = items.condition_id
        JOIN PUBLIC.warehouses AS to_warehouse ON to_warehouse.warehouse_id = stockcards.to_warehouse
        JOIN PUBLIC.warehouses AS from_warehouse ON from_warehouse.warehouse_id = stockcards.from_warehouse
    WHERE
        ((stockcards.to_warehouse = '${wh}' AND stockcards.sc_id LIKE 'IM%') OR
        (stockcards.from_warehouse = '${wh}' AND stockcards.sc_id LIKE 'TF%'))
        AND items.item_id = '${id}' -- Add this line to filter by item_id
    ORDER BY
        stockcards.timestamp ASC;
`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

// find by findByItemIDandLot ---
Stockcards.findByItemIDandLot = ({ id, lot }, result) => {
    console.log(id);
    console.log(lot);
    dbConn.query(`
    SELECT  
        stockcards.* ,
        T.item_name AS item_name,
        Wfrom.warehouse_name AS from_warehouse_name,
        Wfrom.warehouse_id AS from_warehouse,
        Told.item_name AS item_old_name,
        Told.item_id AS item_old,
        Wto.warehouse_name AS to_warehouse_name,
        Wto.warehouse_id AS to_warehouse,
        units.unit_name,
        types.type_name
    FROM 
        public.warehouses AS Wfrom,
        public.warehouses AS Wto,
        public.stockcards
        LEFT JOIN public.items AS Told ON stockcards.item_old = Told.item_id
        INNER JOIN public.items AS T ON stockcards.item_id = T.item_id 
        INNER JOIN public.units ON T.unit_id = units.unit_id
        INNER JOIN public.types ON T.type_id = types.type_id
    WHERE
        stockcards.from_warehouse = Wfrom.warehouse_id
        AND stockcards.to_warehouse = Wto.warehouse_id
        AND stockcards.item_id = '${id}'
        AND stockcards.sc_lot = '${lot}'
    ORDER BY
        stockcards.sc_lot`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows);
            return;
        }
        result({ type: "not_found" }, null);
    });
};

// find by findByItemIDandLotandExp ---
Stockcards.findByItemIDandLotandExp = ({ id, lot,exp }, result) => {
    console.log(id);
    console.log(lot);
    dbConn.query(`
    SELECT  
        stockcards.* ,
        T.item_name AS item_name,
        Wfrom.warehouse_name AS from_warehouse_name,
        Wfrom.warehouse_id AS from_warehouse,
        Told.item_name AS item_old_name,
        Told.item_id AS item_old,
        Wto.warehouse_name AS to_warehouse_name,
        Wto.warehouse_id AS to_warehouse,
        units.unit_name,
        types.type_name
    FROM 
        public.warehouses AS Wfrom,
        public.warehouses AS Wto,
        public.stockcards
        LEFT JOIN public.items AS Told ON stockcards.item_old = Told.item_id
        INNER JOIN public.items AS T ON stockcards.item_id = T.item_id 
        INNER JOIN public.units ON T.unit_id = units.unit_id
        INNER JOIN public.types ON T.type_id = types.type_id
    WHERE
        stockcards.from_warehouse = Wfrom.warehouse_id
        AND stockcards.to_warehouse = Wto.warehouse_id
        AND stockcards.item_id = '${id}'
        AND stockcards.sc_lot = '${lot}'
        AND stockcards.sc_exp = '${exp}'
    ORDER BY
        stockcards.sc_lot`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("count", res.rowCount);
        if (res.rowCount) {
            result(null, res.rows[0]);
            return;
        }
        result({ type: "not_found" }, null);
    });
};





// create
Stockcards.create = (model, result) => {
    let key = Object.keys(model)
    let values = Object.values(model)
    // key.splice(0, 1)
    // values.splice(0, 1)
    let key_insert = key.join(',')
    console.log("model: ", model);
    console.log("key_insert", key_insert);
    console.log("values", values);
    dbConn.query(`
    INSERT INTO 
        public.stockcards (${key_insert}) 
    VALUES 
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// delete
Stockcards.remove = (id, result) => {
    dbConn.query(`
    DELETE 
    FROM 
        public.stockcards 
    WHERE 
        stockcards.sc_id = '${id}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: id });
    });
};
// update
Stockcards.updateById = (bodyData, result) => {
    var uSql = `UPDATE public.stockcards SET `;
    var id = null;
    for (var index in bodyData) {
        var updateKey = bodyData[index].key;
        var updateValue = bodyData[index].value;
        if (updateKey == "sc_id") {
            id = updateValue;
            continue;
        }
        uSql += updateKey + " = '" + updateValue + "' , ";
    }
    uSql = uSql.substring(0, uSql.lastIndexOf(","));
    uSql += ` WHERE sc_id = '${id}'`;
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

module.exports = Stockcards;