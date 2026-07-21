import { User } from "../store/authStore";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000); // Simulate API latency
    
    const isCandidate = email === "candidate@careerai.com" && password === "candidate123";
    const isAdmin = email === "admin@careerai.com" && password === "admin123";

    if (isCandidate) {
      return { email, role: "candidate", name: "Alex Mercer" };
    }
    if (isAdmin) {
      return { email, role: "admin", name: "System Admin" };
    }
    
    throw new Error("Invalid email or password. Please use mock credentials.");
  },

  register: async (name: string, email: string): Promise<User> => {
    await delay(1200);
    return { name, email, role: "candidate" };
  }
};
