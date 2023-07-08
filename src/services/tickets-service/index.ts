import ticketsRepository from "../../repositories/tickets-repository";
import { notFoundError } from '@/errors';

async function getTicketsTypes() {
    const ticketsTypes = await ticketsRepository.getTicketsTypes();
    return ticketsTypes;
}

async function getTickets(userId: number) {
    const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);

    if (!enrollment) {
        throw notFoundError();
    }
    const enrollmentId = enrollment.id;

    const ticket = await ticketsRepository.getTicketByEnrollmentId(enrollmentId);

    if (!ticket) {
        throw notFoundError();
    }

    return await ticketsRepository.getTickets(ticket);
}

async function createTicket(ticketTypeId: number, userId: number) {
    const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);

    if (!enrollment) {
        throw notFoundError();
    }

    await ticketsRepository.createTicket(ticketTypeId, enrollment.id);

    return await getTickets(userId);
}

const ticketsService = {
    getTicketsTypes,
    getTickets,
    createTicket
};

export default ticketsService;