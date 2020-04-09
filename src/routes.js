const express = require("express");

// 👁 Only for simulate localy geoApi axios promises
const {
  locations: locGood,
} = require("./statics_for_tests/res_geoapi.json").results[0];

const {
  locations: locBad,
} = require("./statics_for_tests/res_geoapi_error.json").results[0];

const {
  latLng: goodGeo,
} = require("./statics_for_tests/res_geoapi.json").results[0].providedLocation;
const {
  latLng: badGeo,
} = require("./statics_for_tests/res_geoapi_error.json").results[0].providedLocation;

const routes = express.Router();

// 👁 MIDLEWARE
// lograd cidade     estado     pais       cep
// street adminArea5 adminArea3 adminArea1 postalCode
// REMEMBER TO SET THIS AS ASYNC/AWAIT AXIOS RES
routes.use(function timeLog(req, res, next) {
  const { latitude: lat, longitude: lng } = req.body;
  let data = req.body;

  // 👁 I make this for simulate geoApi response, and set my request body
  // to my router contoller
  if (lat == goodGeo.lat && lng == goodGeo.lng) {
    data.endereco = {
      logradouro: locGood[0].street,
      cidade: locGood[0].adminArea5,
      estado: locGood[0].adminArea3,
      pais: locGood[0].adminArea1,
      cep: locGood[0].postalCode,
    };

    req.body = { data: data };
  } else if (lat == badGeo.lat && lng == badGeo.lng) {
    const { postalCode: zip } = locBad[0];
    const { geocodeQuality: place } = locBad[0];

    // 👁 Error test, variables
    // req.body = "400";
    // err = "400";
    err = "";

    if (req.body == err) {
      req.body = {
        400: {
          message: "Request invalido",
          code: "01",
        },
      };
    } else if (zip == "" && place != "STREET") {
      req.body = {
        404: {
          message: "Endereço não encontrado para essa localidade.",
          code: "02",
        },
      };
    }
  }

  //console.log(req.body);
  next();
});

routes.post("/v1/denuncias", (req, res) => {
  const data = req.body;
  const statusCode = JSON.parse(Object.getOwnPropertyNames(data));

  if ([400, 404].includes(statusCode)) {
    const error = new Object();
    error.error = data[statusCode];

    res.status(statusCode).json(error);
  } else {
    res.json(data);
  }
});

module.exports = routes;
