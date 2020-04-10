const emptyField = (req, res) => {
  const { denunciante, denuncia } = req.body;

  if (
    [
      denunciante["nome"],
      denunciante["cpf"],
      denuncia["titulo"],
      denuncia["descricao"],
    ].includes("")
  ) {
    res.body = 401;
    return true;
  }
  return false;
};

module.exports = emptyField;
