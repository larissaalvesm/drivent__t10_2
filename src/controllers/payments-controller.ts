import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from "@/services/payments-service";
import { Payment } from "@/protocols";

export async function getPayments(req: AuthenticatedRequest, res: Response){
    const receivedTicketId = req.query.ticketId as string;
    const { userId } = req;

    if (!receivedTicketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const ticketId = parseInt(receivedTicketId);

    const payment = await paymentsService.getPayments(ticketId, userId);
    return res.send(payment);
}

export async function processPayment(req: AuthenticatedRequest, res: Response){
    const { ticketId, cardData } = req.body as Payment;
    const {userId} = req;

    if (!ticketId || !cardData){
        res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.processPayment(userId, ticketId, cardData);

    return res.send(payment);
}