import { prisma } from "../../config";


async function getTicketsTypes(){
    return await prisma.ticketType.findMany();
}

const ticketsRepository = {
    getTicketsTypes
}

export default ticketsRepository;