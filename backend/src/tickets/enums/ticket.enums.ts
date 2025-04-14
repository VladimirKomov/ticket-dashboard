// Supported ticket status values
export enum TicketStatus {
    OPEN = 'open',
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
}

// Priority levels used for ticket sorting/filtering
export enum TicketPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    // default if not provided
    UNKNOWN = 'unknown',
}