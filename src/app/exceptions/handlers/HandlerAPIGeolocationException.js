class HandlerAPIGeolocationException {
  static init() {
    return {
      error: {
        message: 'Erro na API de Geolocalização.',
        code: 5,
      },
    };
  }
}

export default HandlerAPIGeolocationException;
