const API_URL = "http://localhost:8080/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json();
    if (err.error === "authorization header required") {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return undefined as never;
    }
    throw new Error(err.error || "Something went wrong");
  }

  return res.json();
}

export const api = {
  register: (data: { email: string; password: string; name: string }) =>
    request<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProfile: () => request<{ user: User }>("/user/profile"),

  updateProfile: (data: { name?: string; email?: string }) =>
    request<{ user: User }>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteProfile: () =>
    request<{ message: string }>("/user/profile", {
      method: "DELETE",
    }),

  getBobsGames: (data: { amount: number; offset: number }) => {
    const params = new URLSearchParams({
      amount: data.amount.toString(),
      offset: data.offset.toString(),
    });
    return request<{
      games: Bobs27Game[];
      total: number;
      amount: number;
      offset: number;
    }>(`/games/bobs?${params}`);
  },

  insertBobsGame: (data: {
    bed: number;
    score: number;
    beds: { bed: number; hits: number }[];
  }) =>
    request<Bobs27Game>("/games/bobs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export interface Bobs27Game {
  id: number;
  user_id: number;
  played_at: string;
  bed: number;
  score: number;
  beds: {
    bed: number;
    hits: number;
  }[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}
