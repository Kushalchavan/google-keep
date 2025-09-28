import API from "./api";

export const getNotes = async () => {
  const { data } = await API.get("/note/notes");
  return data;
};

export const createNote = async (payload) => {
  const { data } = await API.post("/note/create", payload);
  return data;
};

export const updateNote = async (id, payload) => {
  const { data } = await API.put(`/note/update/${id}`, payload);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await API.delete(`/notes/${id}`);
  return data;
};
