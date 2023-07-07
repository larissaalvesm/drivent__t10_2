import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "../middlewares";

export async function getTicketsTypes(req: Request, res: Response){
    try{
        const ticketsTypes = await ticketsService.getTicketsTypes();
        res.send(ticketsTypes);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}


export async function getTickets(req: AuthenticatedRequest, res: Response){
    try{
        const { userId }= req;

        const tickets = await ticketsService.getTickets(userId);

        res.send(tickets);
    
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}