const express = require("express");
const geoApi = require("./utils/geoApi");
const IncidentController = require("./controllers/IncidentController");

const routes = express.Router();

routes.use(async (req, res, next) => {
  await geoApi(req, res);
  next();
});

routes.post("/v1/denuncias", IncidentController.create);

module.exports = routes;
