import ticketsRepository from "../../repositories/tickets-repository";

async function getTicketsTypes(){
    const ticketsTypes = await ticketsRepository.getTicketsTypes();
    return ticketsTypes;
}

async function getTickets(userId: number){
    return await ticketsRepository.getTickets(userId);
}

const ticketsService = {
    getTicketsTypes,
    getTickets
};
  
export default ticketsService;