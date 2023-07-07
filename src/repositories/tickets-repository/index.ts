import { Prisma, Ticket } from "@prisma/client";
import { prisma } from "../../config";
import { notFoundError } from '@/errors';

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

const ticketsRepository = {
    getTicketsTypes,
    getTickets,
    createTicket,
    getEnrollmentByUserId,
    getTicketByEnrollmentId
}

export default ticketsRepository;