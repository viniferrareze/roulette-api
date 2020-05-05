import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import situationRouter from './situation.routes';
import stoneRoutes from './stone.routes';
import gamerRoutes from './gamer.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/situations', situationRouter);
routes.use('/stone', stoneRoutes);
routes.use('/gamer', gamerRoutes);

export default routes;
