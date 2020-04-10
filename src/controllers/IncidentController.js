const error = require("../utils/errorValidation");
const modelControl = require("../models/modelControl");

module.exports = {
  async create(req, res) {
    const err = await error(res);

    if (typeof res.body == "number") {
      res.status(res.body).json({ error: err });
    } else {
      await modelControl(res);

      const data = res.body;
      res.json(data);
    }
  },
};

// console.log(id);
