import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateGamerService from '../services/CreateGamerService';

import Gamer from '../models/Gamer';

const gamerRoutes = Router();

gamerRoutes.use(ensureAuthenticated);

gamerRoutes.post('/', async (req, res) => {
   const { date } = req.body;
   const parsedDate = parseISO(date);

   const createGamerService = new CreateGamerService();

   const gamer = await createGamerService.execute({ date: parsedDate });

   return res.json(gamer);
});

gamerRoutes.get('/', async (req, res) => {
   const gamerRepository = getRepository(Gamer);

   const gamers = await gamerRepository.find({ order: { id: 'DESC', date: 'DESC' } });

   return res.json(gamers);
});

export default gamerRoutes;
