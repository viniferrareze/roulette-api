import { Router } from 'express';

import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import Situation from '../models/Situation';

const situationRoutes = Router();

situationRoutes.use(ensureAuthenticated);

situationRoutes.get('/', async (req, res) => {
   const situationRepository = getRepository(Situation);

   const situations = await situationRepository.find({ where: { active: true } });

   return res.json(situations);
});

export default situationRoutes;
