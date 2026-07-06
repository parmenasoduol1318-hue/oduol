// frontend/app/chat/new.tsx

import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";
import chatService from "../../services/chat/chatService";

export default function NewChatScreen() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const createChat = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      const chat = await chatService.createChat({
        title,
      });

      router.replace(`/chat/${chat.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={26}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          New Chat
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          Chat Title
        </Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Example: Biology Homework"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.button,
            !title.trim() && styles.disabledButton,
          ]}
          disabled={!title.trim() || loading}
          onPress={createChat}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons
                name="chatbubble-ellipses"
                size={20}
                color="#fff"
              />

              <Text style={styles.buttonText}>
                Create Chat
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.tip}>
          Tip: If you leave the title empty in future updates,
          SwiftReply will automatically generate one from the
          first message.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  content: {
    flex: 1,
    padding: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: Colors.text,
    fontSize: 16,
  },

  button: {
    marginTop: 30,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  tip: {
    marginTop: 30,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});