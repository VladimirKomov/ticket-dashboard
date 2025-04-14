import {IsEnum} from 'class-validator';
import {TicketStatus} from '../enums/ticket.enums';

// DTO for validating incoming status updates
export class UpdateTicketStatusDto {
    // Must be a valid value from the TicketStatus enum
    @IsEnum(TicketStatus, {message: 'Invalid status value'})
    status!: TicketStatus;
}