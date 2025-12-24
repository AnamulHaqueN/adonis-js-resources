import api from "./axios";

export type WorkspacePayload = {
  name: string;
};

export interface WorkspaceData {
  id: number;
  companyId: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type Workspace = {
  data: WorkspaceData[];
};

export const getWorkspaces = async (page = 1, limit = 10) => {
  const res = await api.get("/workspaces", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};

export const listWorkspace = async (): Promise<WorkspaceData[]> => {
  const res = await api.get("/workspaces/list");
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
