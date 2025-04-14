import {Body, Controller, Get, NotFoundException, Param, Patch, Query} from '@nestjs/common';
import {TicketsService} from '../services/tickets.service';
import {Ticket} from '../entities/ticket.entity';
import {UpdateTicketStatusDto} from "../dto/tickets.module";

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {
    }

    @Get()
    async getAll(@Query('status') status?: string): Promise<Ticket[]> {
        return this.ticketsService.findAll(status);
    }

    @Patch(':id')
    async updateStatus(
        @Param('id') id: string,
        @Body() body: UpdateTicketStatusDto,
    ): Promise<{ message: string }> {
        try {
            await this.ticketsService.updateStatus(id, body.status);
            return {message: `Ticket ${id} updated successfully`};
        } catch (e) {
            if (e instanceof Error) {
                throw new NotFoundException(e.message);
            }
            throw new NotFoundException('Unknown error');
        }
    }
}
