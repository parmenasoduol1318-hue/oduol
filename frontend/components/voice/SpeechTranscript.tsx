// frontend/components/voice/SpeechTranscript.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface SpeechTranscriptProps {
  transcript: string;

  isListening?: boolean;
  isFinal?: boolean;

  onCopy?: () => void;
  onClear?: () => void;
}

export default function SpeechTranscript({
  transcript,
  isListening = false,
  isFinal = false,
  onCopy,
  onClear,
}: SpeechTranscriptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusRow}>
          <Ionicons
            name={
              isListening
                ? "mic"
                : "document-text-outline"
            }
            size={18}
            color={Colors.primary}
          />

          <Text style={styles.title}>
            {isListening
              ? "Listening..."
              : "Transcript"}
          </Text>

          {isFinal && (
            <View style={styles.finalBadge}>
              <Text style={styles.finalText}>
                FINAL
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          {transcript.length > 0 && (
            <>
              <TouchableOpacity
                onPress={onCopy}
                style={styles.iconButton}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClear}
                style={styles.iconButton}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#DC2626"
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {transcript.length > 0 ? (
          <Text style={styles.text}>
            {transcript}
          </Text>
        ) : (
          <Text style={styles.placeholder}>
            {isListening
              ? "Start speaking..."
              : "No transcript available."}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    minHeight: 180,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  finalBadge: {
    marginLeft: 10,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  finalText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#15803D",
  },

  actions: {
    flexDirection: "row",
  },

  iconButton: {
    marginLeft: 12,
  },

  content: {
    flex: 1,
  },

  text: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.text,
  },

  placeholder: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
});