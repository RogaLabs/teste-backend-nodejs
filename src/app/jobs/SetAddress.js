import redisConfig from '../../config/redis';
import redis from 'redis';

const { promisify } = require('util');

class SetAddress {
  get key() {
    return 'SetAddress';
  }

  async handle({ data }) {
    const { latitude, longitude, endereco } = data.address;
    console.log(data);
    const { host, port } = redisConfig;
    const key = `${latitude}/${longitude}`;
    console.log(key);
    const client = redis.createClient(`redis://${host}:${port}`);
    const setData = promisify(client.set).bind(client);
    await setData(key, JSON.stringify(endereco));
  }
}

export default new SetAddress();
