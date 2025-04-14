import {Ticket} from '../entities/ticket.entity';
import {TicketPriority, TicketStatus} from '../enums/ticket.enums';

// Converts a raw object (e.g. from JSON) into a valid Ticket entity
export function mapRawToTicket(raw: any): Ticket {
    const ticket = new Ticket();

    ticket.id = raw.id;
    ticket.title = raw.title;
    ticket.status = normalizeStatus(raw.status);
    ticket.priority = normalizePriority(raw.priority);
    ticket.created = normalizeDate(raw.created);

    return ticket;
}

// Cleans and maps raw status values to TicketStatus enum
function normalizeStatus(value: string): TicketStatus {
    const cleaned = value?.toLowerCase().replace(/\s+/g, '');
    switch (cleaned) {
        case 'open':
            return TicketStatus.OPEN;
        case 'pending':
            return TicketStatus.PENDING;
        case 'in_progress':
            return TicketStatus.IN_PROGRESS;
        case 'resolved':
            return TicketStatus.RESOLVED;
        case 'closed':
            return TicketStatus.CLOSED;
        default:
            return TicketStatus.PENDING;
    }
}

// Maps raw priority values to TicketPriority enum
function normalizePriority(value: string): TicketPriority {
    switch ((value || '').toLowerCase()) {
        case 'low':
            return TicketPriority.LOW;
        case 'medium':
            return TicketPriority.MEDIUM;
        case 'high':
            return TicketPriority.HIGH;
        default:
            return TicketPriority.UNKNOWN;
    }
}

// Parses date string into Date object, throws if invalid
function normalizeDate(value: string): Date {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) return parsed;
    throw new Error(`Invalid date format: ${value}`);
}
