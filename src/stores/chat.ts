import { defineStore } from "pinia";
import { ref } from "vue";
import type { Conversation, Message } from "@/types";

export const useChatStore = defineStore(
  "chat",
  () => {
    const conversations = ref<Conversation[]>([]);
    const currentConversationId = ref<string | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const createConversation = (): Conversation => {
      const newConversation: Conversation = {
        id: `conv_${Date.now()}`,
        title: "新對話",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      conversations.value.unshift(newConversation);
      currentConversationId.value = newConversation.id;
      return newConversation;
    };

    const setCurrentConversation = (conversationId: string): void => {
      currentConversationId.value = conversationId;
    };

    const deleteConversation = (conversationId: string): void => {
      const index = conversations.value.findIndex(
        (c) => c.id === conversationId
      );
      if (index !== -1) {
        conversations.value.splice(index, 1);
      }
    };

    // ✅ 樂觀更新版本：立即添加用戶訊息，返回對話 ID
    const sendMessage = async (
      conversationId: string | undefined,
      content: string
    ): Promise<string> => {
      let targetConversationId = conversationId;

      // ✅ 1. 立即創建或獲取對話
      if (!targetConversationId) {
        const newConv = createConversation();
        targetConversationId = newConv.id;
      }

      const conversation = conversations.value.find(
        (c) => c.id === targetConversationId
      );
      if (!conversation) throw new Error("對話不存在");

      // ✅ 2. 立即添加用戶訊息（樂觀更新）
      const userMessage: Message = {
        id: `msg_${Date.now()}`,
        content,
        role: "user",
        timestamp: new Date(),
      };
      conversation.messages.push(userMessage);

      // ✅ 3. 如果是第一條訊息，立即更新標題
      if (conversation.messages.length === 1) {
        conversation.title =
          content.slice(0, 30) + (content.length > 30 ? "..." : "");
      }

      conversation.updatedAt = new Date();

      // ✅ 4. 立即返回對話 ID（讓 UI 立即跳轉）
      // 然後在背景處理 AI 回覆
      handleAIResponse(targetConversationId, content);

      return targetConversationId;
    };

    // ✅ 5. 背景處理 AI 回覆
    const handleAIResponse = async (
      conversationId: string,
      userMessage: string
    ): Promise<void> => {
      try {
        isLoading.value = true;
        error.value = null;

        const conversation = conversations.value.find(
          (c) => c.id === conversationId
        );
        if (!conversation) return;

        // 模擬 API 延遲
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // AI 回覆
        const aiMessage: Message = {
          id: `msg_${Date.now()}_ai`,
          content: `這是 AI 的回覆：\n\n您說：「${userMessage}」\n\n這是一個模擬回覆，實際應該連接後端 API。\n\n支援 **Markdown** 語法，包括：\n- 列表\n- **粗體**\n- *斜體*\n- \`程式碼\`\n\n\`\`\`javascript\nconsole.log('Hello World')\n\`\`\``,
          role: "assistant",
          timestamp: new Date(),
        };
        conversation.messages.push(aiMessage);
        conversation.updatedAt = new Date();
      } catch (err) {
        error.value = err instanceof Error ? err.message : "AI 回覆失敗";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      conversations,
      currentConversationId,
      isLoading,
      error,
      createConversation,
      setCurrentConversation,
      deleteConversation,
      sendMessage,
    };
  },
  {
    persist: {
      key: "chat-state",
      pick: ["conversations"],
    },
  }
);
