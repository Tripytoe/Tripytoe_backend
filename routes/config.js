const express = require("express");
const configRouter = express.Router();

const { testConfig_typeAPI, GetConfigs } = require("../controllers/config");

//@desc Test Configs API
//@route GET /api/v1/Configs/test
//@access Public
configRouter.get("/test", testConfig_typeAPI);

//@desc Get Configs API
//@route GET /api/v1/getconfigs
//@access Public
configRouter.get("/", GetConfigs);

module.exports = configRouter;
