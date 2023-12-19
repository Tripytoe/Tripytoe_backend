const logger = require("../config/logger.js");
const { validationResult, matchedData } = require("express-validator");
const Config = require("../models/Config");

const testConfig_typeAPI = async (req, res) => {
  return res.status(200).send("Config API test successfull");
};

//@desc Get Configs API
//@route GET /api/v1/user/getconfigs
//@access Public
const GetConfigs = async (req, res) => {
  const errors = validationResult(req); //checking for validations
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  if (!errors.isEmpty()) {
    logger.error(`${ip}: API /api/v1/user/getconfigs  responnded with Error `);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const config = await Config.find({});
    logger.info(`${ip}: API /api/v1/getconfigs | responnded with "retrived configs" `);
    return res.status(201).json({ result: config });
  } catch (e) {
    logger.error(`${ip}: API /api/v1/user/getconfigs  responnded with Error "while retriving configs" `);
    return res.status(500).json(e, " Something went wrong while retriving configs");
  }
};

module.exports = {
  testConfig_typeAPI,
  GetConfigs,
};
