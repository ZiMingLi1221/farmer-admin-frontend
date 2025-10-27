<script setup lang="ts">
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()

const mainMarginLeft = computed(() => {
  return sidebarStore.isPinned ? '336px' : '80px'
})
</script>

<template>
  <main class="main-content" :style="{ marginLeft: mainMarginLeft }">
    <router-view />
  </main>
</template>

<style scoped>
.main-content {
  height: 100vh;
  /* ✅ 改用固定高度 */
  padding-top: 4rem;
  /* Header 高度 */
  overflow: hidden;
  /* ✅ 防止滾動 */
  transition: margin-left 0.3s ease;
  box-sizing: border-box;
  background-color: var(--bg-primary);
  /* ✅ 確保背景色 */
}
</style>
