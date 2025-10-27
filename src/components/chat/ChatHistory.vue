<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import { useSidebarStore } from '@/stores/sidebar' // ✅ 新增
import DeleteConfirmModal from './DeleteConfirmModal.vue'

const router = useRouter()
const route = useRoute()
const chatStore = useChatStore()
const sidebarStore = useSidebarStore() // ✅ 新增

const activeConversationId = computed(() => route.params.id as string | undefined)

const showDeleteModal = ref(false)
const conversationToDelete = ref<string | null>(null)

const handleChatClick = (conversationId: string): void => {
    router.push(`/chat/${conversationId}`)
}

const handleDeleteClick = (conversationId: string, event: Event): void => {
    event.stopPropagation()
    conversationToDelete.value = conversationId
    showDeleteModal.value = true
}

const confirmDelete = (): void => {
    if (conversationToDelete.value) {
        chatStore.deleteConversation(conversationToDelete.value)
        if (activeConversationId.value === conversationToDelete.value) {
            router.push('/chat')
        }
        showDeleteModal.value = false
        conversationToDelete.value = null
    }
}

const cancelDelete = (): void => {
    showDeleteModal.value = false
    conversationToDelete.value = null
}

const formatDateTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')

    return `${month}月${day}日 ${hours}:${minutes}`
}

// ✅ 新增：切換釘選
const handleTogglePin = (): void => {
    sidebarStore.togglePin()
}
</script>

<template>
    <div class="chat-history">
        <!-- Header（新增釘選按鈕） -->
        <div class="history-header">
            <h2 class="history-title">對話歷史</h2>
            <!-- 釘選按鈕 -->
            <button class="pin-button" :class="{ pinned: sidebarStore.isPinned }" @click="handleTogglePin"
                :title="sidebarStore.isPinned ? '取消釘選' : '釘選側邊欄'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <!-- 圖釘圖示 -->
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        :fill="sidebarStore.isPinned ? 'currentColor' : 'none'" />
                </svg>
            </button>
        </div>

        <!-- Chat List -->
        <div class="chat-list scrollbar-thin">
            <div class="chat-list-content">
                <!-- Empty State -->
                <div v-if="chatStore.conversations.length === 0" class="empty-state">
                    <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p class="empty-text">尚無對話記錄</p>
                    <p class="empty-hint">點擊側邊欄「新對話」開始</p>
                </div>

                <!-- Conversation Items -->
                <div v-for="conversation in chatStore.conversations" :key="conversation.id" class="conversation-item"
                    :class="{ active: activeConversationId === conversation.id }"
                    @click="handleChatClick(conversation.id)">
                    <div class="conversation-content">
                        <h4 class="conversation-title">{{ conversation.title }}</h4>
                        <span class="conversation-time">{{ formatDateTime(conversation.updatedAt) }}</span>
                    </div>

                    <button class="delete-button" @click="handleDeleteClick(conversation.id, $event)" title="刪除對話">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <DeleteConfirmModal v-if="showDeleteModal" @confirm="confirmDelete" @cancel="cancelDelete" />
    </div>
</template>

<style scoped>
.chat-history {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Header 佈局調整（新增釘選按鈕空間） */
.history-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.history-title {
    color: var(--text-primary);
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
}

/* 釘選按鈕樣式 */
.pin-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 0.375rem;
    background-color: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
}

.pin-button:hover {
    background-color: var(--bg-secondary);
    color: var(--primary);
}

.pin-button.pinned {
    color: var(--primary);
}

.chat-list {
    flex: 1;
    overflow-y: auto;
}

.chat-list-content {
    padding: 0.5rem;
}

.empty-state {
    text-align: center;
    padding: 2rem 1rem;
}

.empty-icon {
    width: 3rem;
    height: 3rem;
    margin: 0 auto 0.75rem;
    color: var(--text-tertiary);
}

.empty-text {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.empty-hint {
    color: var(--text-tertiary);
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.conversation-item {
    padding: 0.75rem;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    background-color: transparent;
}

.conversation-item:hover {
    background-color: var(--bg-tertiary);
}

.conversation-item.active {
    background-color: var(--bg-tertiary);
}

.conversation-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.conversation-title {
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
}

.conversation-time {
    color: var(--text-tertiary);
    font-size: 0.75rem;
}

.delete-button {
    opacity: 0;
    transition: opacity 0.2s;
    color: var(--text-tertiary);
    padding: 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 0.5rem;
    flex-shrink: 0;
}

.conversation-item:hover .delete-button {
    opacity: 1;
}

.delete-button:hover {
    color: var(--primary);
    background-color: rgba(172, 172, 167, 0.2);
}
</style>
