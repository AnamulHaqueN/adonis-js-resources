import api from "./axios";

export const createVotes = async (id: number, votes: "up" | "down") => {
  const res = await api.post(`/notes/${id}/vote`, {
    voteType: votes,
  });
  return res.data;
};
