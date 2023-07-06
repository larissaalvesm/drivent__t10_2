import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsTypes} from '@/controllers';


const ticketsRouter = Router();

ticketsRouter
  .get('/types', getTicketsTypes)
//   .all('/*', authenticateToken)
  .get('/')
  .post('/');

export { ticketsRouter };