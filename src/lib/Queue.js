import Bee from 'bee-queue';

import redisConfig from '../config/redis';

import setAddress from '../app/jobs/SetAddress';
import getAddress from '../app/jobs/GetAddress';

const jobs = [setAddress, getAddress];

class Queue {
  constructor() {
    this.queues = {};
    this.queuesData = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      //   bee.on('succeeded', this.handleData).process(handle);
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED `, err);
  }
}

export default new Queue();
