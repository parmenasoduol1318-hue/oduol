// components/forms/SearchForm.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppInput from "../common/AppInput";
import Colors from "../../constants/colors";

interface SearchFormProps {
  placeholder?: string;
  initialValue?: string;
  loading?: boolean;

  onSearch?: (query: string) => void;
  onClear?: () => void;
}

export default function SearchForm({
  placeholder = "Search...",
  initialValue = "",
  loading = false,
  onSearch,
  onClear,
}: SearchFormProps) {
  const [query, setQuery] =
    useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <AppInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          icon="search-outline"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          style={styles.input}
        />

        {loading ? (
          <Ionicons
            name="hourglass-outline"
            size={22}
            color={Colors.primary}
          />
        ) : query.length > 0 ? (
          <TouchableOpacity
            onPress={clearSearch}
          >
            <Ionicons
              name="close-circle"
              size={22}
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
    width: "100%",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
  },
});