// components/chat/MessageList.tsx

import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";

import ChatBubble from "./ChatBubble";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  copiedMessageId?: string | null;
  onCopy?: (message: Message) => void;
}

export default function MessageList({
  messages,
  loading = false,
  copiedMessageId,
  onCopy,
}: MessageListProps) {
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        Welcome to SwiftReply
      </Text>

      <Text style={styles.emptySubtitle}>
        Start a conversation by sending your first message.
      </Text>
    </View>
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatBubble
          role={item.role}
          message={item.content}
          timestamp={item.createdAt}
          copied={copiedMessageId === item.id}
          onCopy={() => onCopy?.(item)}
        />
      )}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={
        loading ? (
          <ChatBubble
            role="assistant"
            message="Thinking..."
          />
        ) : null
      }
      contentContainerStyle={[
        styles.content,
        messages.length === 0 && styles.emptyContent,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 12,
  },

  emptySubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
});