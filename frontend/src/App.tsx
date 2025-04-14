import './App.css'
import {TicketList} from "./components/TicketList.tsx";

function App() {
    return (
        <div style={{padding: '2rem'}}>
            <h1>🧾 Ticket Dashboard</h1>
            <TicketList/>
        </div>
    );
}

export default App
