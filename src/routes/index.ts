import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import situationRouter from './situation.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/situations', situationRouter);

export default routes;
