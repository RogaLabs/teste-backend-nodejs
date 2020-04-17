class HandlerDatabaseException {
  static init() {
    return {
      error: {
        message: 'Erro no Banco de Dados.',
        code: 3,
      },
    };
  }
}

export default HandlerDatabaseException;
