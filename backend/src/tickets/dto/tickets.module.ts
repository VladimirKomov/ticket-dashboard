import { IsEnum } from 'class-validator';
import { TicketStatus } from '../enums/ticket.enums';

export class UpdateTicketStatusDto {
@IsEnum(TicketStatus, { message: 'Invalid status value' })
status!: TicketStatus;
}