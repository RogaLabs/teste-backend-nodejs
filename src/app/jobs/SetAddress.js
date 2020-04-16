import redisConfig from '../../config/redis';
import redis from 'redis';
import ApiGeolocation from '../../lib/ApiGeolocation';

const { promisify } = require('util');

class SetAddress {
  get key() {
    return 'SetAddress';
  }

  async handle({ data }) {
    const { latitude, longitude } = data.address;
    console.log(data);
    const { host, port } = redisConfig;
    const key = `${latitude}/${longitude}`;
    console.log(key);

    const client = redis.createClient(`redis://${host}:${port}`);
    const setData = promisify(client.set).bind(client);

    try {
      const endereco = await ApiGeolocation.reverseGeoCoding(
        latitude,
        longitude
      );

      await setData(key, JSON.stringify(endereco));
      return JSON.stringify(endereco);
    } catch (err) {
      return JSON.stringify(err);
    }
  }
}

export default new SetAddress();
