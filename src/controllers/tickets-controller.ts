import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes(req: Request, res: Response){
    try{
        const ticketsTypes = await ticketsService.getTicketsTypes();
        res.send(ticketsTypes);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}


