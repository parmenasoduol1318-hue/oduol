// frontend/app/chat.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import aiService from "../services/ai/aiService";

export default function ChatScreen() {
  const user = useAuthStore((state) => state.user);

  const {
    chats,
    currentChatId,
    addChat,
    addMessage,
    setCurrentChat,
  } = useChatStore();

  const [message, setMessage] = useState("");
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!currentChatId) {
      const chatId =
        Date.now().toString();

      addChat({
        id: chatId,
        title: "New Chat",
        messages: [],
        createdAt:
          new Date().toISOString(),
        updatedAt:
          new Date().toISOString(),
      });

      setCurrentChat(chatId);
    }
  }, []);

  const currentChat = chats.find(
    (c) => c.id === currentChatId
  );

  async function sendMessage() {
    if (!message.trim()) return;
    if (!currentChatId) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: message,
      createdAt:
        new Date().toISOString(),
    };

    addMessage(
      currentChatId,
      userMessage
    );

    const prompt = message;

    setMessage("");
    setLoading(true);

    try {
      const response =
        await aiService.chat({
          message: prompt,
          chat_id: currentChatId,
        });

      addMessage(currentChatId, {
        id:
          Date.now().toString() +
          "_assistant",
        role: "assistant",
        content:
          response.data.reply,
        createdAt:
          new Date().toISOString(),
      });
    } catch (error) {
      addMessage(currentChatId, {
        id:
          Date.now().toString() +
          "_error",
        role: "assistant",
        content:
          "An error occurred while generating a response.",
        createdAt:
          new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          SwiftReply
        </Text>

        <Text
          style={styles.subtitle}
        >
          {user?.name ??
            "Guest"}
        </Text>
      </View>

      <FlatList
        data={
          currentChat?.messages ??
          []
        }
        keyExtractor={(item) =>
          item.id
        }
        contentContainerStyle={{
          padding: 16,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.role === "user"
                ? styles.userMessage
                : styles.aiMessage,
            ]}
          >
            <Text
              style={
                styles.messageText
              }
            >
              {item.content}
            </Text>
          </View>
        )}
      />

      <View
        style={styles.inputRow}
      >
        <TextInput
          style={styles.input}
          placeholder="Ask SwiftReply..."
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={
            sendMessage
          }
          disabled={loading}
        >
          <Text
            style={
              styles.sendText
            }
          >
            {loading
              ? "..."
              : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
    },

    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderColor: "#E5E7EB",
      backgroundColor:
        "#FFFFFF",
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
    },

    subtitle: {
      color: "#6B7280",
      marginTop: 4,
    },

    message: {
      padding: 14,
      borderRadius: 12,
      marginBottom: 12,
      maxWidth: "85%",
    },

    userMessage: {
      alignSelf: "flex-end",
      backgroundColor:
        "#2563EB",
    },

    aiMessage: {
      alignSelf: "flex-start",
      backgroundColor:
        "#E5E7EB",
    },

    messageText: {
      color: "#111827",
    },

    inputRow: {
      flexDirection: "row",
      padding: 12,
      borderTopWidth: 1,
      borderColor: "#E5E7EB",
      backgroundColor:
        "#FFFFFF",
    },

    input: {
      flex: 1,
      backgroundColor:
        "#F3F4F6",
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      maxHeight: 120,
    },

    sendButton: {
      marginLeft: 10,
      backgroundColor:
        "#2563EB",
      justifyContent:
        "center",
      alignItems: "center",
      paddingHorizontal: 18,
      borderRadius: 10,
    },

    sendText: {
      color: "#FFFFFF",
      fontWeight: "700",
    },
  });