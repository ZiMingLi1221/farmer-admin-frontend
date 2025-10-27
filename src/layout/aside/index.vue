<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import MainSidebar from './MainSidebar.vue'
import SecondarySidebar from './SecondarySidebar.vue'

const sidebarStore = useSidebarStore()

// ✅ 統一在父容器處理 hover
const handleMouseEnter = (): void => {
    sidebarStore.setHovering(true)
}

const handleMouseLeave = (): void => {
    // ✅ 只在未釘選時才隱藏
    if (!sidebarStore.isPinned) {
        sidebarStore.setHovering(false)
    }
}
</script>

<template>
    <aside class="sidebar-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <MainSidebar />
        <SecondarySidebar />
    </aside>
</template>

<style scoped>
.sidebar-container {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 40;
    display: flex;
}
</style>
