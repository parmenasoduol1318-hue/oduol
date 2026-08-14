// frontend/app/(tabs)/voice.tsx

import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Colors from "../../constants/colors";

export default function VoiceScreen() {
  const [listening, setListening] = useState(false);

  const handleListen = () => {
    setListening((current) => !current);
    Alert.alert(
      listening ? "Voice paused" : "Voice assistant ready",
      listening
        ? "Your voice assistant is paused. Tap again to resume listening."
        : "You can now speak naturally and SwiftReply will respond with AI guidance."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, listening && styles.iconContainerActive]}>
          <Ionicons
            name="mic"
            size={90}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.title}>
          Voice Assistant
        </Text>

        <Text style={styles.subtitle}>
          Talk naturally with SwiftReply using your voice.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleListen}>
          <Ionicons
            name="mic"
            size={26}
            color={Colors.white}
          />

          <Text style={styles.buttonText}>
            {listening ? "Stop Listening" : "Start Listening"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/(tabs)/chats")}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.secondaryText}>
            Open Voice Chat
          </Text>
        </TouchableOpacity>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>
            Status
          </Text>

          <Text style={styles.status}>
            {listening ? "🎤 Listening live" : "🎤 Ready to listen"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  iconContainerActive: {
    backgroundColor: "#DCFCE7",
    borderWidth: 2,
    borderColor: "#10B981",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: Colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    width: "100%",
    marginBottom: 18,
  },

  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 17,
    marginLeft: 10,
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 14,
    width: "100%",
  },

  secondaryText: {
    color: Colors.primary,
    fontWeight: "700",
    marginLeft: 10,
    fontSize: 16,
  },

  statusCard: {
    marginTop: 40,
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  status: {
    fontSize: 15,
    color: Colors.success,
    fontWeight: "600",
  },
});