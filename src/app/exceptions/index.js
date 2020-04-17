import HandlerDataException from './handlers/HandlerDataException';
import HandlerDatabaseException from './handlers/HandlerDatabaseException';
import HandlerRequestMissingException from './handlers/HandlerRequestMissingException';
import HandlerLocalidadeException from './handlers/HandlerLocalidadeException';
import HandlerRedisException from './handlers/HandlerRedisException';
import HandlerAPIGeolocationException from './handlers/HandlerAPIGeolocationException';

const handlers = [
  HandlerDataException,
  HandlerDatabaseException,
  HandlerRequestMissingException,
  HandlerLocalidadeException,
  HandlerRedisException,
  HandlerAPIGeolocationException,
];

class Exception {
  constructor() {
    this.init();
  }

  init() {
    handlers.map((handler) => handler.init());
  }
}

export default new Exception();
