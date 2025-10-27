<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/types'
import { formatMarkdown } from '@/utils/format'

interface Props {
  message: Message
}

const props = defineProps<Props>()

const isUser = computed(() => props.message.role === 'user')

const formattedContent = computed(() => {
  if (isUser.value) {
    return props.message.content
  }
  return formatMarkdown(props.message.content)
})

const formattedTime = computed(() => {
  return new Date(props.message.timestamp).toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>

<template>
  <div :class="['message-container', isUser ? 'message-user' : 'message-assistant']">
    <!-- Avatar (Assistant only) -->
    <div v-if="!isUser" class="message-avatar">
      <div class="avatar-circle avatar-assistant">
        <svg class="avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    </div>

    <!-- Message Content -->
    <div :class="['message-bubble', isUser ? 'bubble-user' : 'bubble-assistant']">
      <!-- User Message -->
      <div v-if="isUser" class="message-text">
        {{ message.content }}
      </div>

      <!-- Assistant Message -->
      <div v-else class="message-markdown" v-html="formattedContent" />

      <!-- Timestamp -->
      <div class="message-timestamp">
        {{ formattedTime }}
      </div>
    </div>

    <!-- Avatar (User only) -->
    <div v-if="isUser" class="message-avatar">
      <div class="avatar-circle avatar-user">
        <svg class="avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========== 訊息容器 ========== */
.message-container {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.message-user {
  justify-content: flex-end;
}

.message-assistant {
  justify-content: flex-start;
}

/* ========== 頭像 ========== */
.message-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-assistant {
  background-color: var(--primary);
}

.avatar-user {
  background-color: var(--text-secondary);
}

.avatar-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

/* ========== 訊息氣泡 ========== */
.message-bubble {
  max-width: 48rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
}

.bubble-user {
  background-color: var(--primary);
  color: white;
}

.bubble-assistant {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

/* ========== 訊息文字 ========== */
.message-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
}

/* ========== 時間戳記 ========== */
.message-timestamp {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  opacity: 0.8;
}

/* ========== Markdown 內容樣式 ========== */
.message-markdown :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.message-markdown :deep(p:last-child) {
  margin-bottom: 0;
}

.message-markdown :deep(h1),
.message-markdown :deep(h2),
.message-markdown :deep(h3) {
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  color: var(--text-primary);
}

.message-markdown :deep(h1:first-child),
.message-markdown :deep(h2:first-child),
.message-markdown :deep(h3:first-child) {
  margin-top: 0;
}

.message-markdown :deep(h1) {
  font-size: 1.25rem;
}

.message-markdown :deep(h2) {
  font-size: 1.125rem;
}

.message-markdown :deep(h3) {
  font-size: 1rem;
}

/* ========== 列表樣式 ========== */
.message-markdown :deep(ul),
.message-markdown :deep(ol) {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
}

.message-markdown :deep(li) {
  margin-bottom: 0.25rem;
  line-height: 1.6;
}

/* ========== 程式碼區塊 ========== */
.message-markdown :deep(pre) {
  background-color: var(--bg-tertiary);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 0.75rem 0;
}

.message-markdown :deep(pre code) {
  font-size: 0.875rem;
  font-family: 'Courier New', Courier, monospace;
  background-color: transparent;
  padding: 0;
  color: var(--text-primary);
}

/* ========== 行內程式碼 ========== */
.message-markdown :deep(code) {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: 'Courier New', Courier, monospace;
}

.message-markdown :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

/* ========== 連結樣式 ========== */
.message-markdown :deep(a) {
  color: var(--primary);
  text-decoration: none;
  transition: opacity 0.2s;
}

.message-markdown :deep(a:hover) {
  opacity: 0.8;
  text-decoration: underline;
}

/* ========== 引用樣式 ========== */
.message-markdown :deep(blockquote) {
  border-left: 4px solid var(--border-primary);
  padding-left: 1rem;
  font-style: italic;
  margin: 0.75rem 0;
  color: var(--text-secondary);
}

/* ========== 表格樣式 ========== */
.message-markdown :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.75rem 0;
}

.message-markdown :deep(th),
.message-markdown :deep(td) {
  border: 1px solid var(--border-primary);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.message-markdown :deep(th) {
  background-color: var(--bg-secondary);
  font-weight: 600;
}

.message-markdown :deep(tr:nth-child(even)) {
  background-color: var(--bg-secondary);
}

/* ========== 水平線 ========== */
.message-markdown :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-primary);
  margin: 1rem 0;
}

/* ========== 圖片樣式 ========== */
.message-markdown :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 0.75rem 0;
}

/* ========== 響應式設計 ========== */
@media (max-width: 768px) {
  .message-bubble {
    max-width: calc(100vw - 5rem);
  }

  .message-markdown :deep(pre) {
    font-size: 0.75rem;
  }
}
</style>
