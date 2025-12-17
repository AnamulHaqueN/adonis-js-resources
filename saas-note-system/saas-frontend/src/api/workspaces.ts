// src/services/workspaceService.ts

const API_URL = "http://localhost:3333/workspaces";

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

export async function getWorkspaces() {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include", // VERY IMPORTANT for cookie auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workspaces");
  }

  return res.json();
}

// CREATE workspace
export const createWorkspace = async (data: WorkspacePayload) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create workspace");
  }

  return res.json();
};

// UPDATE workspace
export const updateWorkspace = async (id: number, data: WorkspacePayload) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update workspace");
  }

  return res.json();
};

// DELETE workspace
export const deleteWorkspace = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete workspace");
  }

  return res.json();
};
