<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import ChatMain from './components/ChatMain.vue'
import ChatInput from './components/ChatInput.vue'

const route = useRoute()
const chatStore = useChatStore()

const conversationId = computed(() => route.params.id as string | undefined)

const currentConversation = computed(() =>
    conversationId.value
        ? chatStore.conversations.find(c => c.id === conversationId.value)
        : null
)

// 監聽路由變化
watch(
    conversationId,
    (newId) => {
        if (newId) {
            chatStore.setCurrentConversation(newId)
        }
    },
    { immediate: true }
)
</script>

<template>
    <div class="chat-page">
        <!-- Chat Main Area -->
        <div class="chat-content">
            <ChatMain :conversation="currentConversation" />
        </div>

        <!-- Chat Input (固定在底部) -->
        <div class="chat-input-wrapper">
            <ChatInput :conversation-id="conversationId" />
        </div>
    </div>
</template>

<style scoped>
/* ========== 聊天頁面容器 ========== */
.chat-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-primary);
}

/* ========== 聊天內容區域 ========== */
.chat-content {
    flex: 1;
    /* 自動填滿剩餘空間 */
    overflow: hidden;
    /* 防止溢出 */
}

/* ========== 輸入框包裝器 ========== */
.chat-input-wrapper {
    flex-shrink: 0;
    /* 防止被壓縮 */
    background-color: var(--bg-primary);
}
</style>
