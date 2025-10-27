<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import farmersLogo from '@/assets/images/national_farmers_logo.png'

const router = useRouter()
const sidebarStore = useSidebarStore()

const handleLogoClick = (): void => {
  router.push('/chat')
  sidebarStore.setActiveModule('conversation') // ✅ 更新側邊欄狀態
}
</script>

<template>
  <button class="logo-button" title="返回首頁" @click="handleLogoClick">
    <img :src="farmersLogo" alt="農會 LOGO" class="logo-image" />
  </button>
</template>

<style scoped>
.logo-button {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;
  border: none;
  padding: 0;
  overflow: hidden;
}

.logo-button:hover {
  transform: scale(1.05);
  background-color: var(--bg-secondary);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
