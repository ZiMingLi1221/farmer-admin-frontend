import { watch, onMounted, onBeforeUnmount, toRef } from "vue"; // ← 新增 toRef
import { useThemeStore } from "@/stores/theme";
import type { ThemeMode, AppliedTheme } from "@/types/theme";
import { FA_MEDIA_QUERY_DARK, FA_DARK_CLASS } from "@/theme/config";

export function useTheme() {
  const themeStore = useThemeStore();
  let mediaQuery: MediaQueryList | null = null;

  /**
   * 獲取系統主題
   */
  const getSystemTheme = (): AppliedTheme => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia(FA_MEDIA_QUERY_DARK).matches ? "dark" : "light";
  };

  /**
   * 應用主題到 DOM
   * 切換 <html class="dark">
   */
  const applyTheme = (theme: AppliedTheme): void => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add(FA_DARK_CLASS);
    } else {
      root.classList.remove(FA_DARK_CLASS);
    }

    themeStore.setAppliedTheme(theme);
  };

  /**
   * 更新主題
   */
  const updateTheme = (): void => {
    const theme = themeStore.currentTheme;
    let appliedTheme: AppliedTheme;

    if (theme === "system") {
      appliedTheme = getSystemTheme();
    } else {
      appliedTheme = theme;
    }

    applyTheme(appliedTheme);
  };

  /**
   * 系統主題變化監聽器
   */
  const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
    if (themeStore.currentTheme === "system") {
      applyTheme(e.matches ? "dark" : "light");
    }
  };

  /**
   * 設定主題
   */
  const setTheme = (theme: ThemeMode): void => {
    themeStore.setTheme(theme);
    updateTheme();
  };

  /**
   * 初始化主題
   */
  const initTheme = (): void => {
    // 監聽系統主題變化
    if (typeof window !== "undefined") {
      mediaQuery = window.matchMedia(FA_MEDIA_QUERY_DARK);
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    }

    // 應用初始主題
    updateTheme();
  };

  /**
   * 清理監聽器
   */
  const cleanup = (): void => {
    if (mediaQuery) {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  };

  // 生命週期
  onMounted(() => {
    initTheme();
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  // 監聽 store 中的主題變化
  watch(
    () => themeStore.currentTheme,
    () => {
      updateTheme();
    }
  );

  return {
    // 狀態（ 使用 toRef 確保響應式）
    theme: toRef(themeStore, "currentTheme"), // ← 修改這行
    appliedTheme: toRef(themeStore, "appliedTheme"), // ← 修改這行
    isDark: themeStore.isDark,
    isLight: themeStore.isLight,
    isSystem: themeStore.isSystem,
    // 方法
    setTheme,
    initTheme,
  };
}
