<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '@/types'

interface Props {
  item: MenuItem
  isActive?: boolean
  isNewChat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  isNewChat: false
})

interface Emits {
  (e: 'click', item: MenuItem): void
}

const emit = defineEmits<Emits>()

const buttonRef = ref<HTMLButtonElement | null>(null)
const showTooltip = ref(false)
const tooltipStyle = ref({})

const handleClick = (): void => {
  emit('click', props.item)
}

const handleMouseEnter = (): void => {
  if (buttonRef.value) {
    const rect = buttonRef.value.getBoundingClientRect()
    tooltipStyle.value = {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + 12}px`,
      transform: 'translateY(-50%)'
    }
    showTooltip.value = true
  }
}

const handleMouseLeave = (): void => {
  showTooltip.value = false
}
</script>

<template>
  <div>
    <button ref="buttonRef" class="menu-button" :class="{
      active: isActive && !isNewChat,
      'new-chat-button': isNewChat
    }" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <svg class="menu-icon" :class="{ 'new-chat-icon': isNewChat }" fill="none" stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
      </svg>
    </button>

    <Teleport to="body">
      <Transition name="tooltip">
        <div v-if="showTooltip" class="menu-tooltip" :style="tooltipStyle">
          {{ item.label }}
          <div class="tooltip-arrow"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.menu-button {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--text-secondary);
}

.menu-button:hover {
  background-color: var(--bg-tertiary);
  color: var(--primary);
}

.menu-button.active {
  background-color: var(--primary);
  color: white;
}

.menu-button.active:hover {
  background-color: var(--primary-hover);
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: all 0.2s;
}

/* ===== 新對話按鈕獨立樣式 ===== */
.new-chat-button {
  background-color: transparent;
  color: var(--text-secondary);
}

.new-chat-button:hover {
  background-color: var(--bg-tertiary);
  color: var(--primary);
}

.new-chat-button:active {
  background-color: var(--bg-tertiary);
}

.new-chat-button:active .new-chat-icon {
  width: 1.35rem;
  height: 1.35rem;
}

/* Tooltip */
.menu-tooltip {
  position: fixed;
  padding: 0.5rem 0.75rem;
  background-color: var(--bg-primary);
  color: #1a1a1a;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  white-space: nowrap;
  z-index: 9999;
  border: 1px solid var(--border-primary);
  pointer-events: none;
}

.dark .menu-tooltip {
  background-color: #2a2a2a;
  color: #f3f4f6;
  border-color: #3a3a3a;
}

.tooltip-arrow {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 6px 5px 0;
  border-color: transparent var(--bg-primary) transparent transparent;
}

.dark .tooltip-arrow {
  border-color: transparent #2a2a2a transparent transparent;
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
