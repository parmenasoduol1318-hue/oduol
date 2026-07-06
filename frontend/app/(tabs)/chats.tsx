import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useChatStore } from "@/store/chatStore";

export default function ChatsScreen() {
  const {
    chats,
    loading,
    fetchChats,
    createChat,
  } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, []);

  const handleNewChat = async () => {
    try {
      const chat = await createChat("New Chat");

      if (chat?.id) {
        router.push(`/chat/${chat.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="chatbubble-ellipses"
          size={24}
          color="#2563EB"
        />
      </View>

      <View style={styles.chatInfo}>
        <Text style={styles.chatTitle}>
          {item.title || "Untitled Chat"}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.chatSubtitle}
        >
          {item.last_message || "Start chatting..."}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.loadingText}>
          Loading chats...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Chats
        </Text>

        <TouchableOpacity
          style={styles.newButton}
          onPress={handleNewChat}
        >
          <Ionicons
            name="add"
            size={22}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="chatbubbles-outline"
              size={80}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No chats yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Tap the + button to start your first AI
              conversation.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 55,
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  newButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  chatCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  chatInfo: {
    flex: 1,
    marginLeft: 14,
  },

  chatTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },

  chatSubtitle: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 90,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
  },

  emptySubtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 10,
    lineHeight: 22,
    fontSize: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    color: "#6B7280",
    fontSize: 16,
  },
});