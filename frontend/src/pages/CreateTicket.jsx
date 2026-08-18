import { useState } from "react";

function CreateTicket() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitted(true);

    console.log("Ticket submitted:", formData);
  };

  return (
    <div className="page">

      <h1 className="page-title">
        Create Support Ticket
      </h1>

      <p className="page-subtitle">
        Tell us about your issue and our support team will help you.
      </p>

      {submitted ? (
        <div className="form-card">

          <h2>✅ Ticket Created Successfully</h2>

          <p style={{ marginTop: "12px" }}>
            Your support request has been submitted.
          </p>

          <p style={{ marginTop: "8px" }}>
            Ticket ID: <strong>#1001</strong>
          </p>

          <button
            className="primary-btn"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                subject: "",
                description: "",
              });
            }}
          >
            Create Another Ticket
          </button>

        </div>
      ) : (

        <form
          className="form-card"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

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

          <button
            type="submit"
            className="primary-btn"
          >
            Create Ticket
          </button>

        </form>

      )}

    </div>
  );
}

export default CreateTicket;