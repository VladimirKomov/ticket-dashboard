import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { mapRawToTicket } from '../mappers/ticket.mapper';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepo: Repository<Ticket>,
    ) {}

    async onApplicationBootstrap() {
        const count = await this.ticketRepo.count();
        if (count > 0) {
            console.log('Tickets already exist, skipping seed.');
            return;
        }

        // the file is located in the root
        const filePath = path.join(__dirname, '..', '..', '..', '..', 'tickets.json');
        const file = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);

        const tickets = data.dashboardTickets.map(mapRawToTicket);
        await this.ticketRepo.save(tickets);

        console.log(`Seeded ${tickets.length} tickets`);
    }
}
