import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTickets, getTicketsTypes} from '@/controllers';


const ticketsRouter = Router();
ticketsRouter.use(authenticateToken);

ticketsRouter
  .get('/types', getTicketsTypes)
  .get('/', getTickets)
  .post('/')

export { ticketsRouter };