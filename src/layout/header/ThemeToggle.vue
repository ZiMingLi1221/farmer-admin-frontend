<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useTheme } from '@/composables/useTheme'
import ThemeDropdown from './ThemeDropdown.vue'

const { theme } = useTheme()
const dropdownOpen = ref(false)

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
    dropdownOpen.value = false
}

// ✅ 根據當前主題顯示對應圖示
const themeIcon = computed(() => {
    const currentTheme = theme.value

    if (currentTheme === 'dark') return 'moon'
    if (currentTheme === 'light') return 'sun'
    return 'system'
})

// ✅ 主題顯示名稱
const themeLabel = computed(() => {
    const currentTheme = theme.value
    if (currentTheme === 'dark') return '深色'
    if (currentTheme === 'light') return '淺色'
    return '系統'
})

// ✅ 點擊外部關閉下拉選單
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.theme-toggle-container')) {
        closeDropdown()
    }
}

// 全域點擊監聽
document.addEventListener('click', handleClickOutside)
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="theme-toggle-container">
        <button class="theme-button" @click.stop="toggleDropdown" :title="`當前主題: ${themeLabel}`"
            :aria-label="`切換主題 (當前: ${themeLabel})`">
            <!-- 太陽圖示（淺色模式） -->
            <svg v-if="themeIcon === 'sun'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

            <!-- 月亮圖示（深色模式） -->
            <svg v-else-if="themeIcon === 'moon'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>

            <!-- 電腦圖示（系統模式） -->
            <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </button>

        <ThemeDropdown v-if="dropdownOpen" @close="closeDropdown" />
    </div>
</template>

<style scoped>
.theme-toggle-container {
    position: relative;
}

.theme-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.theme-button:hover {
    background: var(--bg-tertiary);
}

.theme-button:active {
    transform: scale(0.95);
}

.icon {
    width: 1.25rem;
    height: 1.25rem;
}
</style>
