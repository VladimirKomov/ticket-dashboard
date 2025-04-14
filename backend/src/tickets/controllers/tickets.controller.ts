import {Body, Controller, Get, NotFoundException, Param, Patch, Query, Logger} from '@nestjs/common';
import {TicketsService} from '../services/tickets.service';
import {Ticket} from '../entities/ticket.entity';
import {UpdateTicketStatusDto} from "../dto/tickets.module";

@Controller('tickets')
export class TicketsController {
    private readonly logger = new Logger(TicketsController.name);
    constructor(private readonly ticketsService: TicketsService) {
    }

    @Get()
    async getAll(@Query('status') status?: string): Promise<Ticket[]> {
        this.logger.log(`Getting tickets${status ? ` with status = ${status}` : ''}`);
        return this.ticketsService.findAll(status);
    }

    @Patch(':id')
    async updateStatus(
        @Param('id') id: string,
        @Body() body: UpdateTicketStatusDto,
    ): Promise<{ message: string }> {
        this.logger.log(`Updating ticket ${id} to status "${body.status}"`);
        try {
            await this.ticketsService.updateStatus(id, body.status);
            return {message: `Ticket ${id} updated successfully`};
        } catch (e) {
            this.logger.error(`Failed to update ticket ${id}: ${e instanceof Error ? e.message : e}`);
            if (e instanceof Error) {
                throw new NotFoundException(e.message);
            }
            throw new NotFoundException('Unknown error');
        }
    }
}
