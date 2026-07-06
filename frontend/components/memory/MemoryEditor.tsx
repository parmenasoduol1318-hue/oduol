// frontend/components/memory/MemoryEditor.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
} from "react-native";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";

interface MemoryEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;

  loading?: boolean;

  onSave: (memory: {
    title: string;
    content: string;
    category: string;
  }) => Promise<void> | void;
}

export default function MemoryEditor({
  initialTitle = "",
  initialContent = "",
  initialCategory = "",
  loading = false,
  onSave,
}: MemoryEditorProps) {
  const [title, setTitle] =
    useState(initialTitle);

  const [content, setContent] =
    useState(initialContent);

  const [category, setCategory] =
    useState(initialCategory);

  const [saving, setSaving] =
    useState(false);

  const saveMemory = async () => {
    if (!title.trim()) {
      Alert.alert(
        "Title Required",
        "Please enter a title."
      );
      return;
    }

    if (!content.trim()) {
      Alert.alert(
        "Content Required",
        "Please enter some memory content."
      );
      return;
    }

    try {
      setSaving(true);

      await onSave({
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        label="Title"
        placeholder="Memory title"
        value={title}
        onChangeText={setTitle}
        icon="bookmark-outline"
        required
      />

      <AppInput
        label="Category"
        placeholder="Example: Personal, Work..."
        value={category}
        onChangeText={setCategory}
        icon="pricetag-outline"
      />

      <AppInput
        label="Memory"
        placeholder="What should SwiftReply remember?"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={7}
        textAlignVertical="top"
        style={styles.input}
        required
      />

      <AppButton
        title="Save Memory"
        icon="save-outline"
        loading={loading || saving}
        onPress={saveMemory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    minHeight: 170,
    paddingTop: 14,
  },
});