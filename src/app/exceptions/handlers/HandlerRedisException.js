class HandlerRedisException {
  static init() {
    return {
      error: {
        message: 'Endereço não encontrado para essa localidade.',
        code: 4,
      },
    };
  }
}

export default HandlerRedisException;
