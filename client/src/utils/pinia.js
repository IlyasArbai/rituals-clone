import { defineStore } from "pinia";
import { ref } from "vue";
import api from "./axios";

const user = ref(null);
const loading = ref(false);
const initialized = ref(false);
const isAuthenticated = ref(false);

export const useAuthStore = defineStore("auth", () => {
  async function checkSession() {
    loading.value = true;

    try {
      const { data } = await api.get("/auth/me");

      if (!data.success) {
        user.value = null;
        isAuthenticated.value = false;
        return false;
      }

      user.value = data.user ?? null;
      isAuthenticated.value = true;

      return true;
    } catch (error) {
      console.error("Session check error:", error);

      user.value = null;
      isAuthenticated.value = false;

      return false;
    } finally {
      loading.value = false;
      initialized.value = true;
    }
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      user.value = null;
      isAuthenticated.value = false;
    }
  }

  async function login(data) {
    user.value = data;
    isAuthenticated.value = true;
    initialized.value = true;
  }

  return {
    user,
    loading,
    initialized,
    isAuthenticated,
    checkSession,
    login,
    logout,
  };
});
