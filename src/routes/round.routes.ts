import { Router } from 'express';
import CreateRoundService from '../services/CreateRoundService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import UpdateRoundService from '../services/UpdateRoundService';

const roundRoutes = Router();

roundRoutes.use(ensureAuthenticated);

roundRoutes.post('/', async (req, res) => {
   const { gamer_id, stone_id } = req.body;

   const createRoundServer = new CreateRoundService();

   const sequencies = await createRoundServer.execute({ gamer_id, stone_id });

   return res.json(sequencies);
});

roundRoutes.put('/', async (req, res) => {
   const { gamer_id, stone_id, round_id } = req.body;

   const updateRoundServer = new UpdateRoundService();

   const sequencies = await updateRoundServer.execute({ gamer_id, stone_id, round_id });

   return res.json(sequencies);
});

export default roundRoutes;
