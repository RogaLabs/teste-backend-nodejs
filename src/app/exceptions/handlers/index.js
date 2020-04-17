import HandlerDataException from './HandlerDataException';
import HandlerDatabaseException from './HandlerDatabaseException';
import HandlerRequestMissingException from './HandlerRequestMissingException';
import HandlerLocalidadeException from './HandlerLocalidadeException';
import HandlerRedisException from './HandlerRedisException';
import HandlerAPIGeolocationException from './HandlerAPIGeolocationException';

export default {
  HandlerData: HandlerDataException.init(),
  HandlerDatabase: HandlerDatabaseException.init(),
  HandlerErrorServer: HandlerRequestMissingException.init(),
  HandlerLocalidade: HandlerLocalidadeException.init(),
  HandlerAPIGeolocation: HandlerAPIGeolocationException.init(),
  HandlerRedis: HandlerRedisException.init(),
  returnErrorResponse: (error, res) =>
    res.status(400).json({
      error,
    }),
};
