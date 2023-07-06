import ticketsRepository from "../../repositories/tickets-repository";

async function getTicketsTypes(){
    const ticketsTypes = await ticketsRepository.getTicketsTypes();
    return ticketsTypes;
}

const ticketsService = {
    getTicketsTypes
};
  
export default ticketsService;