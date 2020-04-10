const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    if (typeof res.body == "number") {
      const stautscode = res.body;
      let err = {};

      if (stautscode == 400) {
        err = {
          message: "Requisição inválida",
          code: "01",
        };
      } else if (stautscode == 404) {
        err = {
          message: "Endereço não encontrado para essa localidade.",
          code: "02",
        };
      } else if (stautscode == 403) {
        err = {
          message: "Sem autorização, contate o suporte.",
          code: "03",
        };
      } else if (stautscode > 403) {
        err = {
          message: "No momento estamos em manutenção",
          code: "04",
        };
      }
      res.status(res.body).json({ error: err });
    } else {
      const {
        latitude,
        longitude,
        denunciante,
        denuncia,
        endereco,
      } = req.body.data;

      const id = await connection("users")
        .where("cpf", denunciante["cpf"])
        .select("id")
        .first();

      if (id) {
        await connection("incidents").insert({
          user_id: id.id,
          title: denuncia["titulo"],
          description: denuncia["descricao"],
          created_at: connection.fn.now(),
          updated_at: connection.fn.now(),
        });
      } else {
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

        await connection("incidents").insert({
          user_id: id,
          title: denuncia["titulo"],
          description: denuncia["descricao"],
          created_at: connection.fn.now(),
          updated_at: connection.fn.now(),
        });
      }

      res.json(req.body);
    }
  },
};

// console.log(id);
