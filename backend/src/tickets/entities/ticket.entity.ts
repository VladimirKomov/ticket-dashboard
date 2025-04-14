import { Entity, Column, PrimaryColumn } from 'typeorm';
import {TicketPriority, TicketStatus} from "../enums/ticket.enums";

@Entity()
export class Ticket {
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @Column({ type: 'text' })
    status!: TicketStatus;

    @Column({ type: 'text' })
    priority!: TicketPriority;

    @Column({ type: 'text', update: false })
    created!: Date;
}