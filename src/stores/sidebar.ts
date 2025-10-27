import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ModuleType } from "@/types";

export const useSidebarStore = defineStore(
  "sidebar",
  () => {
    const activeModule = ref<ModuleType>("conversation");
    const isHovering = ref<boolean>(false);
    const isPinned = ref<boolean>(false);

    // ✅ 簡化邏輯：只依賴 isPinned 和 isHovering
    const shouldShowSecondary = computed<boolean>(() => {
      return isPinned.value || isHovering.value;
    });

    const setActiveModule = (module: ModuleType): void => {
      activeModule.value = module;
    };

    const setHovering = (value: boolean): void => {
      isHovering.value = value;
    };

    const togglePin = (): void => {
      isPinned.value = !isPinned.value;
    };

    return {
      activeModule,
      isHovering,
      isPinned,
      shouldShowSecondary,
      setActiveModule,
      setHovering,
      togglePin,
    };
  },
  {
    persist: true,
  }
);
