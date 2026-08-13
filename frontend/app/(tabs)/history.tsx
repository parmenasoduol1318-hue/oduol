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

export default function HistoryScreen() {
  const {
    chats,
    loading,
    fetchChats,
  } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, []);

  const sortedChats = [...chats].sort((a, b) => {
    return (
      new Date(b.updatedAt || b.createdAt).getTime() -
      new Date(a.updatedAt || a.createdAt).getTime()
    );
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
        <Text style={styles.loadingText}>
          Loading history...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chat History
      </Text>

      <FlatList
        data={sortedChats}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/chat/${item.id}`)
            }
          >
            <View style={styles.icon}>
              <Ionicons
                name="time"
                size={22}
                color="#2563EB"
              />
            </View>

            <View style={styles.content}>
              <Text
                style={styles.chatTitle}
                numberOfLines={1}
              >
                {item.title || "Untitled Chat"}
              </Text>

              <Text
                numberOfLines={2}
                style={styles.preview}
              >
                {item.last_message ||
                  "No messages yet"}
              </Text>

              <Text style={styles.date}>
                {new Date(
                  item.updatedAt || item.createdAt
                ).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="time-outline"
              size={80}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No History
            </Text>

            <Text style={styles.emptySubtitle}>
              Your previous conversations will
              appear here.
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
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  chatTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  preview: {
    color: "#6B7280",
    marginTop: 5,
    lineHeight: 20,
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#9CA3AF",
  },

  emptyContainer: {
    marginTop: 90,
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
    fontSize: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 14,
    color: "#6B7280",
    fontSize: 16,
  },
});