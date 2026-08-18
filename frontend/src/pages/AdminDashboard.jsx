const tickets = [
  {
    id: 1001,
    subject: "Payment deducted twice",
    customer: "Huda",
    priority: "HIGH",
    status: "OPEN",
  },
  {
    id: 1002,
    subject: "Refund not received",
    customer: "Rahul",
    priority: "MEDIUM",
    status: "OPEN",
  },
  {
    id: 1003,
    subject: "Unable to change email",
    customer: "Priya",
    priority: "LOW",
    status: "RESOLVED",
  },
  {
    id: 1004,
    subject: "Account locked",
    customer: "Aman",
    priority: "URGENT",
    status: "ESCALATED",
  },
  {
    id: 1005,
    subject: "Order not delivered",
    customer: "Neha",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },
];

function AdminDashboard() {
  return (
    <div className="page">

      <h1 className="page-title">
        Admin Dashboard
      </h1>

      <p className="page-subtitle">
        Monitor customer support tickets and escalations.
      </p>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>124</p>
        </div>

        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p>38</p>
        </div>

        <div className="stat-card">
          <h3>High Priority</h3>
          <p>17</p>
        </div>

        <div className="stat-card">
          <h3>Escalated</h3>
          <p>6</p>
        </div>

      </div>

      {/* Ticket Table */}

      <h2 style={{ marginBottom: "15px" }}>
        Recent Tickets
      </h2>

      <div style={{ overflowX: "auto" }}>

        <table className="ticket-table">

          <thead>
            <tr>
              <th>Ticket</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {tickets.map((ticket) => (

              <tr key={ticket.id}>

                <td>
                  #{ticket.id}
                </td>

                <td>
                  {ticket.customer}
                </td>

                <td>
                  {ticket.subject}
                </td>

                <td>
                  <span
                    className={`badge badge-${ticket.priority.toLowerCase()}`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <span
                   className={`badge status-${ticket.status.toLowerCase()}`}>
                   {ticket.status}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;