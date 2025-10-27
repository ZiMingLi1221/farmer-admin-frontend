<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import ChatHistory from '@/components/chat/ChatHistory.vue'

const sidebarStore = useSidebarStore()

// ✅ SecondarySidebar 自己也需要觸發 hover
const handleMouseEnter = (): void => {
  if (!sidebarStore.isPinned) {
    sidebarStore.setHovering(true)
  }
}

const handleMouseLeave = (): void => {
  if (!sidebarStore.isPinned) {
    sidebarStore.setHovering(false)
  }
}
</script>

<template>
  <div class="secondary-sidebar" :class="{
    expanded: sidebarStore.shouldShowSecondary,
    pinned: sidebarStore.isPinned
  }" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="secondary-sidebar-content scrollbar-thin">
      <div v-if="sidebarStore.activeModule === 'conversation' || sidebarStore.activeModule === 'new-chat'"
        class="sidebar-section">
        <ChatHistory />
      </div>

      <div v-else-if="sidebarStore.activeModule === 'knowledge'" class="sidebar-section">
        <h3 class="section-title">知識庫分類</h3>
        <p class="section-placeholder">待實作...</p>
      </div>

      <div v-else-if="sidebarStore.activeModule === 'forms'" class="sidebar-section">
        <h3 class="section-title">表單模板</h3>
        <p class="section-placeholder">待實作...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.secondary-sidebar {
  height: 100vh;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  overflow: hidden;
  width: 0;
  position: fixed;
  left: 5rem;
  top: 0;
  z-index: 30;
  transition: width 0.15s ease, opacity 0.15s ease;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.secondary-sidebar.expanded {
  width: 16rem;
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.secondary-sidebar.pinned {
  position: relative;
  left: 0;
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.secondary-sidebar-content {
  width: 16rem;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-section {
  padding: 0;
}

.section-title {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
}

.section-placeholder {
  color: var(--text-tertiary);
  font-size: 0.875rem;
  padding: 0 1rem;
}
</style>
