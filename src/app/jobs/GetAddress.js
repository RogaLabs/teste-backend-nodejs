import redisConfig from '../../config/redis';
import redis from 'redis';
import handlers from '../exceptions/handlers';

const { promisify } = require('util');
const { HandlerRedis } = handlers;

class GetAddress {
  constructor() {}

  get key() {
    return 'GetAddress';
  }

  async handle({ data }) {
    try {
      const { latitude, longitude } = data.address;
      const { host, port } = redisConfig;
      const key = `${latitude}/${longitude}`;

      const client = redis.createClient(`redis://${host}:${port}`);
      const getData = promisify(client.get).bind(client);
      const dataAddress = await getData(key);
      console.log('Get ---> ', dataAddress);

      return dataAddress ? JSON.stringify(dataAddress) : JSON.stringify(null);
    } catch (err) {
      const { error } = HandlerRedis;
      return JSON.stringify(error);
    }
  }
}

export default new GetAddress();
