const error = (res) => {
  if (res.body == 400) {
    return {
      message: "Requisição inválida",
      code: "01",
    };
  } else if (res.body == 404) {
    return {
      message: "Endereço não encontrado para essa localidade.",
      code: "02",
    };
  } else if (res.body == 403) {
    return {
      message: "Sem autorização, contate o suporte.",
      code: "03",
    };
  } else if (res.body > 403) {
    return {
      message: "No momento estamos em manutenção",
      code: "04",
    };
  }
};

module.exports = error;
