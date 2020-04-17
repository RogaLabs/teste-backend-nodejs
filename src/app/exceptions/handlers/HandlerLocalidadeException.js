class HandlerLocalidadeException {
  static init() {
    return {
      error: {
        message: 'Endereço não encontrado para essa localidade.',
        code: 2,
      },
    };
  }
}

export default HandlerLocalidadeException;
