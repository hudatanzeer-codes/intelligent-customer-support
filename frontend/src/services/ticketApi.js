import api from "./api";

export const createTicket = async (ticketData) => {
  const response = await api.post("/api/tickets/", ticketData);
  return response.data;
};

export const getMyTickets = async () => {
  const response = await api.get("/api/tickets/");
  return response.data;
};

export const getTicketById = async (ticketId) => {
  const response = await api.get(`/api/tickets/${ticketId}`);
  return response.data;
};

export const updateTicket = async (ticketId, ticketData) => {
  const response = await api.patch(
    `/api/tickets/${ticketId}`,
    ticketData
  );

  return response.data;
};