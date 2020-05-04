import { Router } from 'express';

import AuthenticateService from '../services/AuthenticateService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
   const { username, password } = req.body;

   const authenticateService = new AuthenticateService();

   const { user, token } = await authenticateService.execute({ username, password });

   delete user.password;

   return res.json({ user, token });
});

export default sessionsRoutes;
