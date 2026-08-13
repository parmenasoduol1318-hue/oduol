import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { useChatStore } from "@/store/chatStore";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    chats,
    loading,
    fetchMessages,
    sendMessage,
  } = useChatStore();

  const messages = chats.find((chat) => String(chat.id) === String(id))?.messages ?? [];

  const [prompt, setPrompt] = useState("");

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (id) {
      fetchMessages(Number(id));
    }
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 150);
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const message = prompt;
    setPrompt("");

    await sendMessage(Number(id), message);
  };

  if (loading && messages.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.loadingText}>
          Loading conversation...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          SwiftReply
        </Text>

        <Text style={styles.subtitle}>
          AI Conversation
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item: any, index) =>
          `${item.id ?? index}`
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.role === "user"
                ? styles.userContainer
                : styles.aiContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                item.role === "user"
                  ? styles.userBubble
                  : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.role === "user"
                    ? styles.userText
                    : styles.aiText,
                ]}
              >
                {item.content}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Ask SwiftReply anything..."
          placeholderTextColor="#9CA3AF"
          multiline
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Ionicons
            name="send"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingTop: 55,
    paddingBottom: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  subtitle: {
    marginTop: 4,
    color: "#6B7280",
  },

  list: {
    padding: 16,
  },

  messageContainer: {
    marginBottom: 14,
  },

  userContainer: {
    alignItems: "flex-end",
  },

  aiContainer: {
    alignItems: "flex-start",
  },

  messageBubble: {
    maxWidth: "82%",
    borderRadius: 18,
    padding: 14,
  },

  userBubble: {
    backgroundColor: "#2563EB",
    borderBottomRightRadius: 4,
  },

  aiBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    elevation: 1,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 23,
  },

  userText: {
    color: "#FFFFFF",
  },

  aiText: {
    color: "#111827",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 14,
    color: "#6B7280",
    fontSize: 16,
  },
});