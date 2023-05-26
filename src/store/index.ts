import { defineStore } from "pinia";

export const useRoleStore = defineStore({
  id: "userRole",
  state: () => ({
    role: "user",
  }),
  actions: {
    setRole(role: string) {
      this.role = role;
    },
  },
});
