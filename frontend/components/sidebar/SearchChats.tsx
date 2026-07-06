// frontend/components/sidebar/SearchChats.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppInput from "../common/AppInput";
import Colors from "../../constants/colors";

interface SearchChatsProps {
  placeholder?: string;
  initialValue?: string;
  loading?: boolean;

  onSearch?: (query: string) => void;
  onClear?: () => void;
}

export default function SearchChats({
  placeholder = "Search chats...",
  initialValue = "",
  loading = false,
  onSearch,
  onClear,
}: SearchChatsProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(query.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <AppInput
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            icon="search-outline"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>

        {loading ? (
          <Ionicons
            name="hourglass-outline"
            size={22}
            color={Colors.primary}
            style={styles.icon}
          />
        ) : query.length > 0 ? (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.icon}
          >
            <Ionicons
              name="close-circle"
              size={24}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputContainer: {
    flex: 1,
  },

  icon: {
    marginLeft: 10,
  },
});