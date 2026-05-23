import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? "" : "http://localhost:5000")
});

export const getNotes = async () => {
  const response = await api.get("/notes");
  return response.data.data;
};

export const createNote = async (note) => {
  const response = await api.post("/notes", note);
  return response.data.data;
};

export const updateNote = async (id, note) => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data.data;
};

export const deleteNote = async (id) => {
  await api.delete(`/notes/${id}`);
};
