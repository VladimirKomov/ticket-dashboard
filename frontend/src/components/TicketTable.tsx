import { Ticket as TicketType } from '../types/ticket';
import { Ticket } from './Ticket';

interface Props {
    tickets: TicketType[];
    onStatusChange: (id: string, status: string) => void;
}

export function TicketTable({ tickets, onStatusChange }: Props) {
    return (
        <table border={1} cellPadding={5} style={{ marginTop: '1rem', width: '100%' }}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created</th>
                <th>Change Status</th>
            </tr>
            </thead>
            <tbody>
            {tickets.map(ticket => (
                <Ticket key={ticket.id} ticket={ticket} onStatusChange={onStatusChange} />
            ))}
            </tbody>
        </table>
    );
}