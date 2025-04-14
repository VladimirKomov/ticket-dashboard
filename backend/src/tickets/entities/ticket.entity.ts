import { Entity, Column, PrimaryColumn } from 'typeorm';
import {TicketPriority, TicketStatus} from "../enums/ticket.enums";

// Ticket entity stored in the SQLite database
@Entity()
export class Ticket {
    // Unique ticket ID (e.g., DT1, DT2...)
    @PrimaryColumn()
    id!: string;

    // Short description or subject of the ticket
    @Column()
    title!: string;

    // Ticket status (e.g., open, pending, closed)
    @Column({ type: 'text' })
    status!: TicketStatus;

    // Priority level (e.g., high, medium, low)
    @Column({ type: 'text' })
    priority!: TicketPriority;

    // Timestamp when the ticket was created (not updated)
    @Column({ type: 'text', update: false })
    created!: Date;
}