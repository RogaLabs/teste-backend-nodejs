const axios = require("axios").default;
require("dotenv").config();

const geoApi = async (req, res) => {
  const { latitude: lat, longitude: lng } = req.body;
  const data = req.body;

  const errors = await axios
    .get("http://www.mapquestapi.com/geocoding/v1/reverse", {
      params: {
        key: `${process.env.API_KEY}`,
        location: `${lat},${lng}`,
        outFormat: "json",
        thumbMaps: "false",
      },
    })
    .then(function (response) {
      const { statuscode } = response.data.info;
      const location = response.data.results[0].locations[0];
      const isStreet =
        location != undefined && location.geocodeQuality == "STREET"
          ? true
          : false;

      if (statuscode < 400 && location != undefined && isStreet) {
        data.endereco = {
          logradouro: location.street,
          bairro: location.adminArea6,
          cidade: location.adminArea5,
          estado: location.adminArea3,
          pais: location.adminArea1,
          cep: location.postalCode,
        };
        req.body = { data: data };
        return req.body;
      } else if (statuscode >= 400) {
        return (response.status = 400);
      } else if (location == undefined) {
        return (response.status = 404);
      } else if (!isStreet) {
        return (response.status = 404);
      } else {
        return response;
      }
    })
    .catch(function (error) {
      if (error.response.status >= 400) {
        return error.response.status;
      }
    });
  res.body = errors;
};

module.exports = geoApi;
