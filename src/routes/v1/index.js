import { Router } from 'express';

import MakeIncidentController from '../../app/controllers/MakeIncidentController';

const routes = new Router();

routes.get('/denuncias', MakeIncidentController.index);
routes.post('/denuncias', MakeIncidentController.store);

export default routes;
