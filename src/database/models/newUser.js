const connection = require("../connection");
const newIncident = require("./newIncident");

const newUser = async (res) => {
  const { latitude, longitude, denunciante, endereco } = res.body["data"];

  const [id] = await connection("users").insert({
    lat: latitude,
    lng: longitude,
    name: denunciante["nome"],
    cpf: denunciante["cpf"],
    street: endereco["logradouro"],
    district: endereco["bairro"],
    city: endereco["cidade"],
    uf: endereco["estado"],
    country: endereco["pais"],
    zip: endereco["cep"],
    created_at: connection.fn.now(),
    updated_at: connection.fn.now(),
  });

  await newIncident(res, id);

  res.body["data"].id = id;
};

module.exports = newUser;
