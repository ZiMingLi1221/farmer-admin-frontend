import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ThemeMode, AppliedTheme } from "@/types/theme";
import { FA_DEFAULT_THEME, FA_THEME_STORAGE_KEY } from "@/theme/config";

export const useThemeStore = defineStore(
  "theme",
  () => {
    // 狀態
    const currentTheme = ref<ThemeMode>(FA_DEFAULT_THEME);
    const appliedTheme = ref<AppliedTheme>("light");

    // 判斷屬性
    const isDark = computed(() => appliedTheme.value === "dark");
    const isLight = computed(() => appliedTheme.value === "light");
    const isSystem = computed(() => currentTheme.value === "system");

    // 方法
    const setTheme = (theme: ThemeMode): void => {
      currentTheme.value = theme;
    };

    const setAppliedTheme = (theme: AppliedTheme): void => {
      appliedTheme.value = theme;
    };

    return {
      currentTheme,
      appliedTheme,
      isDark,
      isLight,
      isSystem,
      setTheme,
      setAppliedTheme,
    };
  },
  {
    persist: {
      key: FA_THEME_STORAGE_KEY,
      pick: ["currentTheme"],
    },
  }
);
