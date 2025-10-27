<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Conversation } from '@/types'
import ChatMessage from './ChatMessage.vue'

interface Props {
  conversation: Conversation | null | undefined
}

const props = defineProps<Props>()

const messagesContainer = ref<HTMLDivElement | null>(null)

const scrollToBottom = async (): Promise<void> => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 監聽訊息變化，自動滾動至底部
watch(
  () => props.conversation?.messages,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

// ✅ 建議服務選項
const suggestionServices = [
  {
    icon: '🔍',
    title: '幫我查找內部業務、法規知識',
    description: '搜尋公司內部文件、政策法規',
    prompt: '我想查找內部業務知識'
  },
  {
    icon: '📋',
    title: '辦理業務手續',
    description: '協助處理各類業務申請流程',
    prompt: '我想了解如何辦理業務'
  }
]

// ✅ 點擊建議服務（可選實作）
const handleSuggestionClick = (prompt: string) => {
  console.log('選擇建議:', prompt)
  // 這裡可以觸發發送訊息的邏輯
}
</script>

<template>
  <div class="chat-main-container">
    <!-- Messages Container -->
    <div ref="messagesContainer" class="messages-scroll-area">
      <div class="messages-content-wrapper">
        <!-- Empty State -->
        <div v-if="!conversation || conversation.messages.length === 0" class="empty-state">
          <!-- Icon -->
          <div class="empty-state-icon">
            <svg class="icon-chat" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          <!-- Welcome Text -->
          <div class="welcome-content">
            <h2 class="welcome-title">開始新對話</h2>
            <p class="welcome-description">
              選擇以下服務，或在下方輸入框中輸入訊息開始與 AI 對話
            </p>
          </div>

          <!-- Suggestion Services -->
          <div class="suggestion-grid">
            <button v-for="service in suggestionServices" :key="service.title" class="suggestion-card"
              @click="handleSuggestionClick(service.prompt)">
              <span class="suggestion-icon">{{ service.icon }}</span>
              <div class="suggestion-text">
                <h3 class="suggestion-title">{{ service.title }}</h3>
                <p class="suggestion-description">{{ service.description }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div v-else>
          <ChatMessage v-for="message in conversation.messages" :key="message.id" :message="message" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========== 主容器 ========== */
.chat-main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ========== 訊息滾動區域 ========== */
.messages-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1rem;
}

/* 自訂滾動條 */
.messages-scroll-area::-webkit-scrollbar {
  width: 6px;
}

.messages-scroll-area::-webkit-scrollbar-track {
  background-color: transparent;
}

.messages-scroll-area::-webkit-scrollbar-thumb {
  background-color: var(--border-secondary);
  border-radius: 9999px;
}

.messages-scroll-area::-webkit-scrollbar-thumb:hover {
  background-color: var(--text-tertiary);
}

/* ========== 訊息內容包裝器 ========== */
.messages-content-wrapper {
  max-width: 56rem;
  /* 896px */
  margin: 0 auto;
}

/* ========== 空狀態容器 ========== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 3rem 1rem;
}

/* ========== 空狀態圖示 ========== */
.empty-state-icon {
  width: 5rem;
  height: 5rem;
  background-color: var(--primary-light);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.icon-chat {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--primary);
}

/* ========== 歡迎內容 ========== */
.welcome-content {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 32rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.025em;
}

.welcome-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ========== 建議服務網格 ========== */
.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.25rem;
  width: 100%;
  max-width: 48rem;
}

/* ========== 建議卡片 ========== */
.suggestion-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.75rem 1.5rem;
  background-color: var(--bg-primary);
  border: 1.5px solid var(--border-primary);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.suggestion-card:hover {
  border-color: var(--primary);
  background-color: var(--bg-secondary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 173, 104, 0.1);
}

.suggestion-card:active {
  transform: translateY(0);
}

/* ========== 建議圖示 ========== */
.suggestion-icon {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

/* ========== 建議文字 ========== */
.suggestion-text {
  flex: 1;
  min-width: 0;
}

.suggestion-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.suggestion-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ========== 響應式設計 ========== */
@media (max-width: 768px) {
  .messages-scroll-area {
    padding: 1rem 0.75rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-state-icon {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1.5rem;
  }

  .icon-chat {
    width: 2rem;
    height: 2rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .welcome-description {
    font-size: 1rem;
  }

  .suggestion-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .suggestion-card {
    padding: 1.25rem 1rem;
  }

  .suggestion-icon {
    font-size: 1.75rem;
  }
}
</style>
