import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes} from '@/controllers';


const ticketsRouter = Router();
ticketsRouter.use(authenticateToken);

ticketsRouter
  .get('/types', getTicketsTypes)
  .get('/')
  .post('/')

export { ticketsRouter };