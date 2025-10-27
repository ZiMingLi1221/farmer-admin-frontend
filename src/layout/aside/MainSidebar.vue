<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { useRouter } from 'vue-router'
import { NAVIGATION_ITEMS } from '@/constants/navigation'
import SidebarLogo from './SidebarLogo.vue'
import SidebarMenu from './SidebarMenu.vue'
import type { MenuItem } from '@/types'

const sidebarStore = useSidebarStore()
const router = useRouter()

const handleItemClick = (item: MenuItem): void => {
  // 如果是「新對話」按鈕
  if (item.id === 'new-chat') {
    router.push('/chat') // 跳轉到空白對話頁，不創建對話
    sidebarStore.setActiveModule('conversation') // 顯示對話歷史
    return
  }

  // 其他選單項
  sidebarStore.setActiveModule(item.id)
  router.push(item.route)
}
</script>

<template>
  <div class="main-sidebar">
    <div class="logo-container">
      <SidebarLogo />
    </div>

    <nav class="menu-nav">
      <SidebarMenu v-for="item in NAVIGATION_ITEMS" :key="item.id" :item="item"
        :is-active="sidebarStore.activeModule === item.id" :is-new-chat="item.id === 'new-chat'"
        @click="handleItemClick(item)" />
    </nav>

    <div class="user-avatar-container">
      <button class="user-avatar-button" title="使用者">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-sidebar {
  width: 5rem;
  height: 100vh;
  background-color: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
}

.logo-container {
  margin-bottom: 2rem;
}

.menu-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0 0.75rem;
}

.user-avatar-container {
  margin-top: auto;
  padding-top: 1rem;
}

.user-avatar-button {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--bg-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.user-avatar-button:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  transform: scale(1.05);
}
</style>
