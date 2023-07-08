import { Ticket } from "@prisma/client";
import { prisma } from "../../config";
import { Card } from "../../protocols";


async function getPayments(){
//     const ticketType = await prisma.ticketType.findFirst({
//         where: {
//             id: ticket.ticketTypeId
//         }
//     })

//     return ({
//         id: ticket.id,
//         status: ticket.status,
//         ticketTypeId: ticket.ticketTypeId,
//         enrollmentId: ticket.enrollmentId,
//         TicketType: ticketType,
//         createdAt: ticket.createdAt,
//         updatedAt: ticket.updatedAt
// })    
}

async function processPayment(ticket: Ticket, value: number, cardData: Card){

  await prisma.ticket.update({
    where:{id: ticket.id},
    data: {
      ...ticket,
      status: 'PAID'
    }
  })

  const cardDigits = cardData.number.toString();
  const cardLastDigits = cardDigits.substring(cardDigits.length - 4);
  return await prisma.payment.create({
      data:{
        ticketId: ticket.id,
        value,
        cardIssuer: cardData.issuer,
        cardLastDigits,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        ticketId: true,
        value: true,
        cardIssuer: true,
        cardLastDigits: true,
        createdAt: true,
        updatedAt: true
      }
    })
}

const paymentsRepository = {
  getPayments,
  processPayment
}

export default paymentsRepository;