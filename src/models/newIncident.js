const connection = require("../database/connection");

const newIncident = async (res, id) => {
  const { denuncia } = res.body["data"];

  await connection("incidents")
    .insert({
      user_id: id,
      title: denuncia["titulo"],
      description: denuncia["descricao"],
      created_at: connection.fn.now(),
      updated_at: connection.fn.now(),
    })
    .then(console.log(`NOVA DENUNCIA <- USER_ID: ${id}`));
};

module.exports = newIncident;
