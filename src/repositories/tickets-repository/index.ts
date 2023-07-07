import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { notFoundError } from '@/errors';

async function getTicketsTypes(){
    return await prisma.ticketType.findMany();
}

async function getTickets(userId: number){
    const enrollment = await prisma.enrollment.findFirst({
        where:{
            userId
        }
    })
    if (!enrollment) {
        throw notFoundError();
      }
      
    const ticket = await prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollment.id
        }
    })

    if (!ticket) {
        throw notFoundError();
      }

    const ticketType = await prisma.ticketType.findFirst({
        where: {
            id: ticket.ticketTypeId
        }
    })

    return ({
        id: ticket.id,
        status: ticket.status,
        ticketTypeId: ticket.ticketTypeId,
        enrollmentId: ticket.enrollmentId,
        TicketType: ticketType,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
})
    
}

const ticketsRepository = {
    getTicketsTypes,
    getTickets
}

export default ticketsRepository;