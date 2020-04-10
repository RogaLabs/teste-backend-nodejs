const error = require("../utils/errorValidation");
const modelControl = require("../database/models/modelControl");

module.exports = {
  async create(req, res) {
    const err = await error(res);

    if (typeof res.body == "number") {
      res.status(res.body).json({ error: err });
    } else {
      const data = await modelControl(res);
      res.json(data);
    }
  },
};

// console.log(id);
