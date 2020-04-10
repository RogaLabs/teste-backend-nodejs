const connection = require("../connection");

const newUser = require("./newUser");
const newIncident = require("./newIncident");

const modelControl = async (res) => {
  const { denunciante } = res.body["data"];

  const user_id = await connection("users")
    .where("cpf", denunciante["cpf"])
    .select("id")
    .first();

  if (user_id) {
    await newIncident(res, user_id.id);
  } else {
    await newUser(res);
  }

  return res.body;
};

module.exports = modelControl;
