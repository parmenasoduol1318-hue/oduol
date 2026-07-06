// frontend/components/sidebar/ChatHistory.tsx

import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";

import HistoryItem, {
  HistoryItemProps,
} from "./HistoryItem";
import Colors from "../../constants/colors";

interface ChatHistoryProps {
  chats: HistoryItemProps[];

  selectedChatId?: string;

  onChatPress?: (
    chat: HistoryItemProps
  ) => void;

  onDeleteChat?: (
    chat: HistoryItemProps
  ) => void;

  onRenameChat?: (
    chat: HistoryItemProps
  ) => void;
}

export default function ChatHistory({
  chats,
  selectedChatId,
  onChatPress,
  onDeleteChat,
  onRenameChat,
}: ChatHistoryProps) {
  if (chats.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>
          No Chats Yet
        </Text>

        <Text style={styles.emptySubtitle}>
          Start a new conversation and it
          will appear here.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <HistoryItem
          {...item}
          selected={
            item.id === selectedChatId
          }
          onPress={() =>
            onChatPress?.(item)
          }
          onDelete={() =>
            onDeleteChat?.(item)
          }
          onRename={() =>
            onRenameChat?.(item)
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },

  emptySubtitle: {
    textAlign: "center",
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});