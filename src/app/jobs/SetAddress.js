import redisConfig from '../../config/redis';
import redis from 'redis';
import ApiGeolocation from '../../lib/ApiGeolocation';
import handlers from '../exceptions/handlers';

const { HandlerLocalidade, HandlerRedis } = handlers;
const { promisify } = require('util');

class SetAddress {
  get key() {
    return 'SetAddress';
  }

  async handle({ data }) {
    try {
      const { latitude, longitude } = data.address;
      console.log(data);
      const { host, port } = redisConfig;
      const key = `${latitude}/${longitude}`;
      console.log(key);

      const client = redis.createClient(`redis://${host}:${port}`);
      const setData = promisify(client.set).bind(client);

      const endereco = await ApiGeolocation.reverseGeoCoding(
        latitude,
        longitude
      );

      const errorApiGeolocation =
        endereco && endereco.err ? endereco.err : null;
      console.log(errorApiGeolocation);

      if (errorApiGeolocation) {
        const { error } = errorApiGeolocation;
        return JSON.stringify(error);
      }

      const { estado, cidade, pais } = endereco;

      if (
        !estado ||
        !cidade ||
        !pais ||
        estado.length === 0 ||
        cidade.length === 0 ||
        pais.length === 0
      ) {
        const { error } = HandlerLocalidade;
        return JSON.strigify(error);
      }

      await setData(key, JSON.stringify(endereco));
      return JSON.stringify(endereco);
    } catch (err) {
      const { error } = HandlerRedis;
      return JSON.stringify(error);
    }
  }
}

export default new SetAddress();
