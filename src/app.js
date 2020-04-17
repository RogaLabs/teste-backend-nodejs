import 'dotenv/config';

import express from 'express';
import routes from './routes';
import appMiddleware from './app/middlewares/application';

import './app/exceptions';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(appMiddleware);
    this.server.use(routes);
  }
}

export default new App().server;
