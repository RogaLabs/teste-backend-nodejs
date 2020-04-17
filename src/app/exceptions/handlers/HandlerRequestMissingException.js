class HandlerRequestMissingException {
  static init() {
    return {
      error: {
        message: 'Falta dados na Requisição.',
        code: 0,
      },
    };
  }
}

export default HandlerRequestMissingException;
