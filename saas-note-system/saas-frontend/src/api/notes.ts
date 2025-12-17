const API_URL = "http://localhost:3333";

export type NoteType = "public" | "private";

export type Note = {
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
  const res = await fetch(`${API_URL}/notes`, {
    credentials: "include",
  });
  return res.json();
};

export const getNoteById = async (id: number) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    credentials: "include",
  });
  return res.json();
};

export const createNote = async (data: {
  title: string;
  content: string;
  noteType: NoteType;
  workspaceId: number;
}) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateNote = async (
  id: number,
  data: { title: string; content: string; noteType: NoteType }
) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteNote = async (id: number) => {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};
