import api from "./axios";

export type NoteType = "public" | "private";

export type Note = {
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down"; // track user vote
  id: number;
  title: string;
  content: string;
  noteType: NoteType;
  workspaceId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export const getNotes = async (page = 1, limit = 10) => {
  const res = await api.get("/notes", {
    params: {
      page,
      limit,
    },
  });
  console.log("get notes ", res.data);
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
