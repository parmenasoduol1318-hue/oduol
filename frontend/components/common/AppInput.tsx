// components/common/AppInput.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
  required?: boolean;
}

export default function AppInput({
  label,
  error,
  icon,
  secure = false,
  required = false,
  style,
  ...props
}: AppInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secure);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && (
            <Text style={styles.required}> *</Text>
          )}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          focused ? styles.focused : null,
          error ? styles.errorBorder : null,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? Colors.primary : Colors.textSecondary}
            style={styles.icon}
          />
        )}

        <TextInput
          {...props}
          style={[styles.input, style]}
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setHidden(!hidden)}
          >
            <Ionicons
              name={
                hidden
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  required: {
    color: "#DC2626",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    minHeight: 56,
  },

  focused: {
    borderColor: Colors.primary,
  },

  errorBorder: {
    borderColor: "#DC2626",
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 14,
  },

  errorText: {
    marginTop: 6,
    color: "#DC2626",
    fontSize: 13,
  },
});