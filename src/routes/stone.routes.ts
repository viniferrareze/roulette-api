import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import Stone from '../models/Stone';
import AppError from '../errors/AppError';

const stoneRoutes = Router();

stoneRoutes.use(ensureAuthenticated);

stoneRoutes.get('/:id', async (req, res) => {
   const stoneRepository = getRepository(Stone);

   const { id } = req.params;

   const stone = await stoneRepository.findOne(id);

   if (!stone) {
      throw new AppError('Incorret number stone', 400);
   }

   delete stone.created_at;
   delete stone.updated_at;

   return res.json(stone);
});

stoneRoutes.get('/', async (req, res) => {
   const stoneRepository = getRepository(Stone);

   const stones = await stoneRepository.find({ order: { id: 'ASC' } });

   return res.json(stones);
});
export default stoneRoutes;
