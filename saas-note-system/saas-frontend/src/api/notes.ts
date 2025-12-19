import api from "./axios";

export type NoteType = "public" | "private";

export type Note = {
  upvotes: number;
  downvotes: number;
  id: number;
  title: string;
  content: string;
  noteType: NoteType;
  workspaceId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export const getNotes = async () => {
  const res = await api.get("/notes", {});
  return res.data;
};

export const getNoteById = async (id: number) => {
  const res = await api.get(`/notes/${id}`, {});
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  noteType: NoteType;
  workspaceId: number;
}) => {
  const res = await api.post("/notes", data, {});
  return res.data;
};

export const updateNote = async (
  id: number,
  data: {
    title: string;
    content: string;
    noteType: NoteType;
  }
) => {
  const res = await api.put(`/notes/${id}`, data, {});
  return res.data;
};

export const deleteNote = async (id: number) => {
  const res = await api.delete(`/notes/${id}`, {});
  return res.data;
};
