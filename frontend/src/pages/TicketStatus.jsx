import { useParams } from "react-router-dom";

function TicketStatus() {
  const { id } = useParams();

  return (
    <div>
      <h1>Ticket Status</h1>

      <p>Ticket ID: {id}</p>
      <p>Status: Open</p>
      <p>Priority: High</p>
    </div>
  );
}

export default TicketStatus;