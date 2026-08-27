import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerChat from "./pages/CustomerChat";
import CreateTicket from "./pages/CreateTicket";
import TicketStatus from "./pages/TicketStatus";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerChat />} />
        <Route path="/chat" element={<CustomerChat />} />
        <Route path="/ticket" element={<CreateTicket />} />
        <Route path="/ticket/:id" element={<TicketStatus />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;