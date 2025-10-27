import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserInfo } from "@/types/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // State
    const user = ref<UserInfo | null>(null);
    const token = ref<string | null>(null);

    // Getters
    const isAuthenticated = computed(() => !!user.value && !!token.value);
    const isAdmin = computed(() => user.value?.role === "admin");
    const userName = computed(() => user.value?.name || "訪客");
    const userRole = computed(() => {
      const roleMap = {
        admin: "管理員",
        manager: "管理者",
        user: "一般用戶",
        viewer: "訪客",
      };
      return user.value?.role ? roleMap[user.value.role] : "訪客";
    });

    // Actions
    const setUser = (userInfo: UserInfo): void => {
      user.value = userInfo;
    };

    const setToken = (tokenValue: string): void => {
      token.value = tokenValue;
    };

    const logout = (): void => {
      user.value = null;
      token.value = null;
    };

    // 模擬登入（測試用）
    const mockLogin = (): void => {
      setUser({
        id: "1",
        name: "張三",
        role: "admin",
        email: "admin@example.com",
      });
      setToken("mock-token-123");
    };

    return {
      // State
      user,
      token,
      // Getters
      isAuthenticated,
      isAdmin,
      userName,
      userRole,
      // Actions
      setUser,
      setToken,
      logout,
      mockLogin,
    };
  },
  {
    persist: {
      key: "user-info",
      pick: ["user", "token"],
    },
  }
);
