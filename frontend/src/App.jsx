import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CustomerChat from "./pages/CustomerChat";
import CreateTicket from "./pages/CreateTicket";
import TicketStatus from "./pages/TicketStatus";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<CustomerChat />} />
        <Route path="/ticket" element={<CreateTicket />} />
        <Route path="/ticket/:id" element={<TicketStatus />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;