import {TICKET_STATUSES} from "../constants/tickets.ts";


interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function TicketStatusFilter({ value, onChange }: Props) {
    return (
        <label>
            Filter by status:{' '}
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">All</option>
                {Object.entries(TICKET_STATUSES).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
}