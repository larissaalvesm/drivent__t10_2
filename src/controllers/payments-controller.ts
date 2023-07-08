import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares";
import paymentsService from "../services/payments-service";
import { Payment } from "../protocols";


export async function getPayments(req: Request, res: Response){
    try{

    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function processPayment(req: AuthenticatedRequest, res: Response){
    const { ticketId, cardData } = req.body as Payment;
    const {userId} = req.body

    if(!ticketId || !cardData){
        res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const payment = await paymentsService.processPayment(userId, ticketId, cardData);

    return res.send(payment);
}