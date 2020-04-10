import { Router } from 'express';

import v1 from './v1';

const routes = new Router();

routes.use('/v1', v1);

export default routes;
