import redisConfig from '../../config/redis';
import redis from 'redis';

const { promisify } = require('util');

class GetAddress {
  constructor() {}

  get key() {
    return 'GetAddress';
  }

  async handle({ data }) {
    const { latitude, longitude } = data.address;
    const { host, port } = redisConfig;
    const key = `${latitude}/${longitude}`;

    const client = redis.createClient(`redis://${host}:${port}`);
    const getData = promisify(client.get).bind(client);
    const dataAddress = await getData(key);
    console.log('Get ---> ', dataAddress);

    return dataAddress ? JSON.stringify(dataAddress) : JSON.stringify(null);
  }
}

export default new GetAddress();
