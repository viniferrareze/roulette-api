import { Router } from 'express';
import CreateRoundService from '../services/CreateRoundService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const roundRoutes = Router();

roundRoutes.use(ensureAuthenticated);

roundRoutes.post('/', async (req, res) => {
   const { gamer_id, stone_id, round_previus_id } = req.body;

   const createRoundServer = new CreateRoundService();

   const sequencies = await createRoundServer.execute({ gamer_id, stone_id, round_previus_id });

   return res.json(sequencies);
});

export default roundRoutes;
