import { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import { Ticket as TicketType } from '../types/ticket';
import { TicketStatusFilter } from './TicketStatusFilter';
import { TicketTable } from './TicketTable';

// Main UI component to display and interact with ticket list
export function TicketList() {
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [sortBy, setSortBy] = useState<'created' | 'priority'>('created');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch tickets on mount or when filter changes
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const response = await api.get('/tickets', {
                    params: filter ? { status: filter } : {},
                });
                setTickets(response.data);
                setError('');
            } catch (e) {
                setError('Failed to load tickets');
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [filter]);

    // Update ticket status
    const updateStatus = useCallback(async (id: string, status: string) => {
        try {
            await api.patch(`/tickets/${id}`, { status });
            setTickets(prev =>
                prev.map(ticket =>
                    ticket.id === id ? { ...ticket, status } : ticket
                )
            );
        } catch (e) {
            alert('Failed to update status');
        }
    }, []);

    // Sort tickets
    const sortedTickets = [...tickets].sort((a, b) => {
        if (sortBy === 'created') {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
        }
        return a.priority.localeCompare(b.priority);
    });

    return (
        <div>
            <h2>Tickets</h2>

            {/* Status filter */}
            <TicketStatusFilter value={filter} onChange={setFilter} />

            {/* Sorting */}
            <label style={{ marginLeft: '1rem' }}>
                Sort by:{' '}
                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as 'created' | 'priority')}
                >
                    <option value="created">Created</option>
                    <option value="priority">Priority</option>
                </select>
            </label>

            {/* Loader and error handling */}
            {loading && <p>Loading tickets...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <TicketTable tickets={sortedTickets} onStatusChange={updateStatus} />
            )}
        </div>
    );
}
