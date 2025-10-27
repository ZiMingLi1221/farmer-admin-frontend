<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import type { ThemeMode } from '@/types/theme'

const emit = defineEmits<{
    close: []
}>()

const { theme, setTheme } = useTheme()

const themeOptions = [
    { value: 'light' as const, label: '淺色', icon: 'sun' },
    { value: 'dark' as const, label: '深色', icon: 'moon' },
    { value: 'system' as const, label: '系統', icon: 'computer' }
]

const handleSelect = (value: ThemeMode) => {
    setTheme(value)
    emit('close')
}

const isActive = (value: string) => theme.value === value
</script>

<template>
    <div class="theme-dropdown">
        <button v-for="option in themeOptions" :key="option.value" class="theme-option"
            :class="{ active: isActive(option.value) }" @click="handleSelect(option.value)">
            <!-- 太陽圖示 -->
            <svg v-if="option.icon === 'sun'" class="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

            <!-- 月亮圖示 -->
            <svg v-else-if="option.icon === 'moon'" class="option-icon" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>

            <!-- 電腦圖示 -->
            <svg v-else class="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>

            <span class="option-label">{{ option.label }}</span>

            <!-- 選中標記 -->
            <svg v-if="isActive(option.value)" class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        </button>
    </div>
</template>

<style scoped>
.theme-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 10rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-primary);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.5rem;
    z-index: 50;
    animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-0.5rem);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.theme-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--text-primary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
}

.theme-option:hover {
    background: var(--bg-secondary);
}

.theme-option.active {
    background: var(--primary-light);
    color: var(--primary);
}

.option-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}

.option-label {
    flex: 1;
}

.check-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: var(--primary);
}
</style>
