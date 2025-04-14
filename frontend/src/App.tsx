import './App.css'
import reactLogo from './assets/react.svg';
import {TicketList} from "./components/TicketList.tsx";

function App() {
    return (
        <div style={{padding: '2rem'}}>
            <h1>
                <img src={reactLogo} alt="React Logo" style={{width: '32px', height: '32px'}}/>
                Ticket Dashboard
            </h1>
            <TicketList/>
        </div>
    );
}

export default App
