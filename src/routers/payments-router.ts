import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPayments, processPayment } from '../controllers/payments-controller';

const paymentsRouter = Router();
paymentsRouter.use(authenticateToken);

paymentsRouter
  .get('/', getPayments )
  .post('/process', processPayment)

export { paymentsRouter };