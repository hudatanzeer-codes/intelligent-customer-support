import { useState } from "react";
import { createConversation } from "../services/chatApi";
import { createTicket } from "../services/ticketApi";

function CreateTicket() {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "General",
    priority: "MEDIUM",
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.subject.trim() ||
      !formData.description.trim() ||
      !formData.category.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First create a conversation
      const conversation = await createConversation();

      // Then create the ticket using its ID
      const ticket = await createTicket({
        conversation_id: conversation.id,
        subject: formData.subject,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
      });

      setSubmittedTicket(ticket);
    } catch (err) {
      console.error("Ticket creation error:", err);

      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Unable to create ticket. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmittedTicket(null);

    setFormData({
      subject: "",
      description: "",
      category: "General",
      priority: "MEDIUM",
    });

    setError("");
  };

  return (
    <div className="page">
      <h1 className="page-title">
        Create Support Ticket
      </h1>

      <p className="page-subtitle">
        Tell us about your issue and our support team will help you.
      </p>

      {submittedTicket ? (
        <div className="form-card">
          <h2>✅ Ticket Created Successfully</h2>

          <p style={{ marginTop: "12px" }}>
            Your support request has been submitted.
          </p>

          <p style={{ marginTop: "8px" }}>
            Ticket ID:{" "}
            <strong>#{submittedTicket.id}</strong>
          </p>

          <p style={{ marginTop: "8px" }}>
            Status:{" "}
            <strong>{submittedTicket.status}</strong>
          </p>

          <p style={{ marginTop: "8px" }}>
            Priority:{" "}
            <strong>{submittedTicket.priority}</strong>
          </p>

          <button
            className="primary-btn"
            style={{ marginTop: "20px" }}
            onClick={resetForm}
          >
            Create Another Ticket
          </button>
        </div>
      ) : (
        <form
          className="form-card"
          onSubmit={handleSubmit}
        >
          {/* Subject */}
          <div className="form-group">
            <label htmlFor="subject">
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="What is the issue?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Order">Order</option>
              <option value="Payment">Payment</option>
              <option value="Account">Account</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              Describe your problem
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Please explain your issue in detail..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateTicket;