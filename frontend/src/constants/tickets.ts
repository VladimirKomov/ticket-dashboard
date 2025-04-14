export const TICKET_STATUSES = {
    open: 'Open',
    pending: 'Pending',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
} as const;

export type TicketStatus = keyof typeof TICKET_STATUSES;