import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import { AuthenticatedRequest } from "../middlewares";
import { TicketType } from "../protocols";

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

export async function createTicket(req: AuthenticatedRequest, res: Response){
    try{
        const { ticketTypeId }= req.body as TicketType;

        if(!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);

        const { userId }= req;

        const ticket = await ticketsService.createTicket(ticketTypeId, userId);

        res.status(httpStatus.CREATED).send(ticket);
    
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
          }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}