<script setup lang="ts">
import AsideLayout from './aside/index.vue'
import HeaderLayout from './header/index.vue'
import MainLayout from './main/index.vue'
</script>

<template>
  <div class="layout-container">
    <!-- 側邊欄（主 + 次） -->
    <AsideLayout />

    <!-- Header（固定頂部） -->
    <HeaderLayout />

    <!-- 主內容區 -->
    <MainLayout />
  </div>
</template>

<style scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-primary);
}
</style>
