import { notFoundError, unauthorizedError } from "../../errors";
import { Card } from "../../protocols";
import paymentsRepository from "../../repositories/payments-repository";
import ticketsRepository from "../../repositories/tickets-repository";


async function getPayments(ticketId: number, userId: number) {
    const ticket = await ticketsRepository.getTicketById(ticketId);
    if(!ticket ){
    throw notFoundError();
    }

    const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
   if(!enrollment){
    throw notFoundError();
   }

   const ticketByUser = await ticketsRepository.getTicketByEnrollmentId(enrollment.id);
   if(!ticketByUser){
    throw unauthorizedError();
   }

   return await paymentsRepository.getPayments(ticketId);

}

async function processPayment(userId: number, ticketId: number, cardData: Card ) {
   const ticket = await ticketsRepository.getTicketById(ticketId);
   if(!ticket ){
    throw notFoundError();
   }
   
   const enrollment = await ticketsRepository.getEnrollmentByUserId(userId);
   if(!enrollment){
    throw notFoundError();
   }

   const ticketByUser = await ticketsRepository.getTicketByEnrollmentId(enrollment.id);
   if(!ticketByUser){
    throw unauthorizedError();
   }

   const ticketType = await ticketsRepository.getTicketType(ticket);

   return await paymentsRepository.processPayment(ticket, ticketType.price, cardData);
   
}

const paymentsService = {
    getPayments,
    processPayment
};

export default paymentsService;