import api from "./api";

export const createConversation = async () => {
  const response = await api.post("/api/chat/conversation");
  return response.data;
};