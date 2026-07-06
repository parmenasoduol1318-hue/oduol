// components/chat/SuggestedPrompts.tsx

import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  prompts?: string[];
}

const DEFAULT_PROMPTS = [
  "Explain this like I'm 10 years old.",
  "Summarize this article.",
  "Write a professional email.",
  "Translate this to Swahili.",
  "Generate Python code.",
  "Debug my code.",
  "Create study notes.",
  "Solve this math problem.",
  "Generate an image.",
  "Help me plan my day.",
];

export default function SuggestedPrompts({
  onSelectPrompt,
  prompts = DEFAULT_PROMPTS,
}: SuggestedPromptsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {prompts.map((prompt, index) => (
          <TouchableOpacity
            key={`${index}-${prompt}`}
            style={styles.chip}
            activeOpacity={0.8}
            onPress={() => onSelectPrompt(prompt)}
          >
            <Text style={styles.text}>
              {prompt}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  scrollContainer: {
    paddingHorizontal: 12,
  },

  chip: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },

  text: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
});