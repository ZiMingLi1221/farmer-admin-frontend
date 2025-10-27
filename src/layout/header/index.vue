<script setup lang="ts">
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import HeaderTitle from './HeaderTitle.vue'
import ThemeToggle from './ThemeToggle.vue'

const sidebarStore = useSidebarStore()

// ✅ 動態計算左側距離
const headerMarginLeft = computed(() => {
    return sidebarStore.isPinned ? '336px' : '80px'
})

// ✅ 動態計算寬度（避免重疊）
const headerWidth = computed(() => {
    return sidebarStore.isPinned
        ? 'calc(100% - 336px)'
        : 'calc(100% - 80px)'
})
</script>

<template>
    <header class="app-header" :style="{
        marginLeft: headerMarginLeft,
        width: headerWidth
    }">
        <HeaderTitle />
        <div class="header-actions">
            <ThemeToggle />
        </div>
    </header>
</template>

<style scoped>
.app-header {
    height: 4rem;
    background-color: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 30;
    padding: 0 1.5rem;
    transition: all var(--transition-duration, 0.3s) ease;
    /* ✅ 改為 all */
    box-sizing: border-box;
    gap: 1rem;
    /* ✅ 新增：標題與按鈕間距 */
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
    /* ✅ 防止按鈕被壓縮 */
}
</style>
