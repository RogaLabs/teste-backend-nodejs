const express = require("express");
const { locations: locGood } = require("./database/res_geoapi.json").results[0];

const routes = express.Router();

routes.post("/v1/denuncias", (req, res) => {
  const userData = [
    req.body.results[0].locations[0].postalCode,
    req.body.results[0].locations[0].geocodeQuality,
  ]; // 👁 geoApi res with CEP, STREET
  const goodData = [locGood[0].postalCode, locGood[0].geocodeQuality]; // 👁 Ref for a good location, this a callback geoApi

  if (JSON.stringify(userData) == JSON.stringify(goodData)) {
    res.json({
      success: {
        message: "Endereço encontrado para essa localidade",
      },
    });
  } else {
    res.status(404).json({
      error: {
        message: "Endereço não encontrado para essa localidade",
        code: "01",
      },
    });
  }
});

module.exports = routes;
