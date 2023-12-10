const express = require("express");
const RolesRoutes = require("./rolesRoutes");
const UsersRoutes = require("./usersRoutes");
const ItemsRoutes = require("./itemsRoutes");
const UnitsRoutes = require("./unitsRoutes");
const TypesRoutes = require("./typesRoutes");
const StatusRoutes = require("./statusRoutes");
const ConditionsRouter = require("./conditionsRoutes");
const WarehousesRouter = require("./warehousesRoutes");
const ActionsRouter = require("./actionsRoutes");
const StockcardsRouter = require("./stockcardsRoutes");


var routes = express.Router();

routes.use("/roles",RolesRoutes);
routes.use("/users",UsersRoutes);
routes.use("/items",ItemsRoutes);
routes.use("/units",UnitsRoutes);
routes.use("/types",TypesRoutes);
routes.use("/status",StatusRoutes);
routes.use("/conditions",ConditionsRouter);
routes.use("/warehouses",WarehousesRouter);
routes.use("/actions",ActionsRouter);
routes.use("/stockcards",StockcardsRouter);





module.exports = routes;