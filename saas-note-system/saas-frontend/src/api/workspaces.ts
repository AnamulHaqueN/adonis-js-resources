import api from "./axios";

export type WorkspacePayload = {
  name: string;
};
export type Workspace = {
  id: number;
  companyId: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const getWorkspaces = async () => {
  const res = await api.get("/workspaces");
  return res.data;
};

// CREATE workspace
export const createWorkspace = async (data: WorkspacePayload) => {
  const res = await api.post("/workspaces", data);
  return res.data;
};

// UPDATE workspace
export const updateWorkspace = async (id: number, data: WorkspacePayload) => {
  const res = await api.put(`/workspaces/${id}`, data);
  return res.data;
};

// DELETE workspace
export const deleteWorkspace = async (id: number) => {
  const res = await api.delete(`/workspaces/${id}`);
  return res.data;
};
