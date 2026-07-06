// frontend/components/memory/MemoryList.tsx

import React from "react";
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

import Colors from "../../constants/colors";
import MemoryItem, {
  MemoryItemProps,
} from "./MemoryItem";
import MemoryEmpty from "./MemoryEmpty";

interface MemoryListProps {
  memories: MemoryItemProps[];

  loading?: boolean;

  onMemoryPress?: (
    memory: MemoryItemProps
  ) => void;

  onEdit?: (
    memory: MemoryItemProps
  ) => void;

  onDelete?: (
    memory: MemoryItemProps
  ) => void;

  onCreate?: () => void;
}

export default function MemoryList({
  memories,
  loading = false,
  onMemoryPress,
  onEdit,
  onDelete,
  onCreate,
}: MemoryListProps) {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

  if (memories.length === 0) {
    return (
      <MemoryEmpty
        onCreate={onCreate}
      />
    );
  }

  return (
    <FlatList
      data={memories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={
        styles.list
      }
      showsVerticalScrollIndicator={
        false
      }
      renderItem={({ item }) => (
        <MemoryItem
          {...item}
          onPress={() =>
            onMemoryPress?.(item)
          }
          onEdit={() =>
            onEdit?.(item)
          }
          onDelete={() =>
            onDelete?.(item)
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    paddingBottom: 30,
  },
});