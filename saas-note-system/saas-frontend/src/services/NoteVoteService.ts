import axios from "axios";

export const voteNote = async (noteId: number, vote: "up" | "down") => {
  return axios.post(
    `http://localhost:3333/notes/${noteId}/vote`,
    { vote },
    { withCredentials: true }
  );
};
