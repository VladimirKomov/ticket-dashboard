// src/components/Ticket.tsx
import { memo } from 'react';
import { Ticket as TicketType } from '../types/ticket';

interface TicketProps {
    ticket: TicketType;
    onStatusChange: (id: string, status: string) => void;
}

export const Ticket = memo(function Ticket({ ticket, onStatusChange }: TicketProps) {
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
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
            </td>
        </tr>
    );
});
