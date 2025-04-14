// src/components/Ticket.tsx
import {memo} from 'react';
import {Ticket as TicketType} from '../types/ticket';
import {TICKET_STATUSES} from "../constants/tickets.ts";

interface TicketProps {
    ticket: TicketType;
    onStatusChange: (id: string, status: string) => void;
}

export const Ticket = memo(function Ticket({ticket, onStatusChange}: TicketProps) {
    return (
        <tr>
            <td>{ticket.id}</td>
            <td>{ticket.title}</td>
            <td>{ticket.status}</td>
            <td>{ticket.priority || '—'}</td>
            <td>{new Date(ticket.created).toLocaleString()}</td>
            <td>
                <select
                    value={ticket.status}
                    onChange={e => onStatusChange(ticket.id, e.target.value)}
                >
                    {Object.entries(TICKET_STATUSES).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </td>
        </tr>
    );
});
