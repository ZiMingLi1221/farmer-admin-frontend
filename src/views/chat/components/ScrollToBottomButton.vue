<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
    show: boolean  // 是否顯示按鈕
}

defineProps<Props>()

const emit = defineEmits<{
    click: []
}>()

const handleClick = () => {
    emit('click')
}
</script>

<template>
    <Transition name="scroll-button-fade">
        <button v-if="show" class="scroll-to-bottom-button" @click="handleClick" aria-label="滾動到最新">
            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span class="button-text">滾動到最新</span>
        </button>
    </Transition>
</template>

<style scoped>
/* ========== 滾動按鈕 ========== */
.scroll-to-bottom-button {
    position: fixed;
    bottom: 10rem;
    /* 在輸入框上方 */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border-primary);
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 20;
    white-space: nowrap;
}

.scroll-to-bottom-button:hover {
    background-color: var(--bg-secondary);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transform: translateX(-50%);
}


.scroll-to-bottom-button:active {
    background-color: var(--bg-secondary);
    transform: translateX(-50%) scale(0.95);
}


/* ========== 圖示 ========== */
.button-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
}

/* ========== 文字 ========== */
.button-text {
    font-size: 0.875rem;
    font-weight: 500;
}

/* ========== 淡入淡出動畫 ========== */
.scroll-button-fade-enter-active,
.scroll-button-fade-leave-active {
    transition: all 0.3s ease;
}

.scroll-button-fade-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
}

.scroll-button-fade-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
}

/* ========== 響應式設計 ========== */
@media (max-width: 768px) {
    .scroll-to-bottom-button {
        bottom: 7rem;
        padding: 0.625rem 1rem;
    }

    .button-text {
        font-size: 0.8125rem;
    }
}
</style>
