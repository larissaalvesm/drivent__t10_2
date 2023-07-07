import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicket, getTickets, getTicketsTypes} from '@/controllers';



const ticketsRouter = Router();
ticketsRouter.use(authenticateToken);

ticketsRouter
  .get('/types', getTicketsTypes)
  .get('/', getTickets)
  .post('/', createTicket)

export { ticketsRouter };