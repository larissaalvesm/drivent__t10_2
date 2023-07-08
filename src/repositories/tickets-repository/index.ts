import { Ticket } from "@prisma/client";
import { prisma } from "../../config";

async function getTicketsTypes(){
    return await prisma.ticketType.findMany();
}

async function getEnrollmentByUserId(userId: number){
    const enrollment = await prisma.enrollment.findFirst({
        where:{
            userId
        }
    })
    return enrollment;
}

async function getTicketByEnrollmentId(enrollmentId: number){
    const ticket = await prisma.ticket.findFirst({
        where: {
            enrollmentId
        }
    })

    return ticket;
}

async function getTickets(ticket: Ticket){
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

async function getTicketType(ticket: Ticket){
    return await prisma.ticketType.findFirst({
        where: {
            id: ticket.ticketTypeId
        }
    })
}

async function createTicket(ticketTypeId: number, enrollmentId: number){
    return await prisma.ticket.create({
        data: {
            ticketTypeId,
            enrollmentId,
            status: 'RESERVED',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    })
}

async function getTicketById(ticketId: number){
    return await prisma.ticket.findUnique({
        where: {id: ticketId}
    })
}

const ticketsRepository = {
    getTicketsTypes,
    getTickets,
    createTicket,
    getEnrollmentByUserId,
    getTicketByEnrollmentId,
    getTicketById,
    getTicketType
}

export default ticketsRepository;