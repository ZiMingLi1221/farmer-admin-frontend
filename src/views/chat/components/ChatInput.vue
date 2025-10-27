<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'

interface Props {
    conversationId?: string
}

const props = defineProps<Props>()
const chatStore = useChatStore()
const router = useRouter()

const inputText = ref<string>('')
const textareaRef = ref<HTMLDivElement | null>(null)
const isComposing = ref<boolean>(false)

const canSend = computed(() => inputText.value.trim().length > 0 && !chatStore.isLoading)

const handleInput = (event: Event): void => {
    const target = event.target as HTMLDivElement
    inputText.value = target.textContent || ''
}

const handleSend = async (): Promise<void> => {
    if (!canSend.value) return

    const message = inputText.value.trim()

    if (textareaRef.value) {
        textareaRef.value.textContent = ''
    }
    inputText.value = ''

    try {
        const conversationId = await chatStore.sendMessage(props.conversationId, message)

        if (!props.conversationId && conversationId) {
            router.push(`/chat/${conversationId}`)
        }
    } catch (error) {
        console.error('發送訊息失敗:', error)
    }
}

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && !event.shiftKey && !isComposing.value) {
        event.preventDefault()
        handleSend()
    }
}

const handleCompositionStart = (): void => {
    isComposing.value = true
}

const handleCompositionEnd = (): void => {
    isComposing.value = false
}

const handlePaste = (event: ClipboardEvent): void => {
    event.preventDefault()
    const text = event.clipboardData?.getData('text/plain')
    if (text) {
        document.execCommand('insertText', false, text)
    }
}

const handleUpload = (): void => {
    console.log('開啟上傳選單')
}
</script>

<template>
    <div class="input-container input-gradient">
        <div class="input-area-container">
            <div class="input-area-wrapper">
                <!-- 第一行：輸入區域 -->
                <div class="textarea-row">
                    <div class="textarea-container">
                        <div ref="textareaRef" contenteditable="true" role="textbox"
                            :data-placeholder="inputText ? '' : '輸入訊息...'" class="rich-textarea"
                            :class="{ disabled: chatStore.isLoading }" @input="handleInput" @keydown="handleKeydown"
                            @compositionstart="handleCompositionStart" @compositionend="handleCompositionEnd"
                            @paste="handlePaste"></div>
                    </div>
                </div>

                <!-- 第二行：操作按鈕 -->
                <div class="actions-row">
                    <!-- 左側：上傳按鈕 -->
                    <div class="actions-left">
                        <button type="button" class="action-button" @click="handleUpload" title="附加檔案">
                            <span class="button-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <!-- 右側：發送按鈕 -->
                    <div class="actions-right">
                        <button type="button" class="send-button" :class="{ active: canSend }" :disabled="!canSend"
                            @click="handleSend" title="發送訊息">
                            <span v-if="!chatStore.isLoading" class="send-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </span>
                            <span v-else class="loading-spinner">
                                <svg viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" fill="none"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="input-disclaimer">
            <p>AI 可能會出錯，請小心查證</p>
        </div>
    </div>
</template>

<style scoped>
/* ========== 主容器 ========== */
.input-container {
    position: relative;
    width: 100%;
    min-height: 50px;
    align-self: center;
    z-index: 2;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: flex-end;
    padding-inline: 16px;
    background: var(--bg-primary);
}

/* ========== 漸層淡出效果 ========== */
.input-gradient::before {
    content: '';
    position: absolute;
    top: -60px;
    left: 0;
    right: 0;
    height: 60px;
    /* 使用 CSS 變數，淺色模式自動使用 #fcfcf9 */
    background: linear-gradient(to bottom,
            transparent 0%,
            color-mix(in srgb, var(--bg-primary) 30%, transparent) 20%,
            color-mix(in srgb, var(--bg-primary) 70%, transparent) 50%,
            color-mix(in srgb, var(--bg-primary) 90%, transparent) 75%,
            var(--bg-primary) 100%);
    pointer-events: none;
    z-index: 1;
}

/* ========== 輸入區域容器 ========== */
.input-area-container {
    position: relative;
    width: 100%;
    max-width: 896px;
    margin: 0 auto;
    z-index: 2;
}

.input-area-wrapper {
    position: relative;
    width: 100%;
    background: var(--bg-primary);
    border-radius: 16px;
    /* 減少圓角 */
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px var(--border-primary);
    transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
    padding: 12px;
}

.input-area-wrapper:focus-within {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16), 0px 0px 0px 2px var(--primary);
}

/* ========== 第一行：輸入區域 ========== */
.textarea-row {
    width: 100%;
    margin-bottom: 8px;
}

.textarea-container {
    width: 100%;
    min-height: 40px;
    max-height: 200px;
    overflow-y: auto;
}

.rich-textarea {
    outline: none;
    width: 100%;
    min-height: 40px;
    font-size: 16px;
    line-height: 1.5;
    color: var(--text-primary);
    word-wrap: break-word;
    white-space: pre-wrap;
    cursor: text;
    /* 修正游標 */
}

.rich-textarea[data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: var(--text-tertiary);
}

.rich-textarea.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* 滾動條樣式 */
.textarea-container::-webkit-scrollbar {
    width: 6px;
}

.textarea-container::-webkit-scrollbar-thumb {
    background-color: var(--border-secondary);
    border-radius: 8px;
}

/* ========== 第二行：操作按鈕 ========== */
.actions-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.actions-left,
.actions-right {
    display: flex;
    align-items: center;
}

/* 上傳按鈕 */
.action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
}

.action-button:hover {
    background: var(--bg-secondary);
    color: var(--primary);
}

.button-icon {
    display: flex;
    width: 20px;
    height: 20px;
}

/* 發送按鈕 */
.send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: var(--bg-tertiary);
    color: var(--text-tertiary);
    cursor: not-allowed;
    transition: all 0.15s;
}

.send-button.active {
    background: var(--primary);
    color: white;
    cursor: pointer;
}

.send-button.active:hover {
    background: var(--primary-hover);
}

.send-icon,
.loading-spinner {
    display: flex;
    width: 20px;
    height: 20px;
}

.loading-spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* ========== 底部提示 ========== */
.input-disclaimer {
    padding: 12px 0;
    text-align: center;
}

.input-disclaimer p {
    font-size: 12px;
    color: var(--text-tertiary);
}

/* ========== 響應式 ========== */
@media (max-width: 768px) {
    .input-container {
        padding-inline: 8px;
    }
}
</style>
