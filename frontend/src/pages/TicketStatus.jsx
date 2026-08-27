import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicketById } from "../services/ticketApi";

function TicketStatus() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTicketById(id);
        setTicket(data);
      } catch (err) {
        console.error("Ticket fetch error:", err);

        if (err.response?.status === 404) {
          setError("Ticket not found.");
        } else if (err.response?.status === 401) {
          setError("Please log in again.");
        } else {
          setError("Unable to load ticket.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p>Loading ticket...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Ticket Status</h1>

      <div className="form-card">
        <p>
          Ticket ID: <strong>#{ticket.id}</strong>
        </p>

        <p>
          Subject: <strong>{ticket.subject}</strong>
        </p>

        <p>
          Category: <strong>{ticket.category}</strong>
        </p>

        <p>
          Status: <strong>{ticket.status}</strong>
        </p>

        <p>
          Priority: <strong>{ticket.priority}</strong>
        </p>

        <p>
          Description:
        </p>

        <p>{ticket.description}</p>
      </div>
    </div>
  );
}

export default TicketStatus;