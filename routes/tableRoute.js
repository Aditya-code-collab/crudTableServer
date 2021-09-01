const express = require("express");
const tableRouter = express.Router();

const {
    GetAllTableData,
    InsertATableData,
    DeleteATableData,
    updateTableApi,
    mailTableApi,
} = require("../controllers/tableController.js");

tableRouter.post("/", GetAllTableData);
tableRouter.post("/add", InsertATableData);
tableRouter.post("/drop", DeleteATableData);
tableRouter.post("/update", updateTableApi);
tableRouter.post("/mail", mailTableApi);


module.exports = tableRouter;
