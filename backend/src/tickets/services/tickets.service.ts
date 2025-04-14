import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Ticket} from '../entities/ticket.entity';
import {TicketStatus} from "../enums/ticket.enums";

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepo: Repository<Ticket>,
    ) {
    }

    async findAll(status?: string): Promise<Ticket[]> {
        if (status) {
            return this.ticketRepo.find({
                where: {
                    // normalize the string
                    status: status.toLowerCase().replace(/\s+/g, '') as any,
                },
            });
        }

        return this.ticketRepo.find();
    }

    async updateStatus(id: string, status: TicketStatus): Promise<Ticket> {
        const ticket = await this.ticketRepo.findOneBy({id});

        if (!ticket) {
            throw new Error(`Ticket with id ${id} not found`);
        }

        ticket.status = status;
        return this.ticketRepo.save(ticket);
    }

}
