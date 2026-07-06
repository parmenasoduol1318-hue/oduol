// frontend/components/settings/LanguageSettings.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface LanguageSettingsProps {
  languages?: Language[];
  selectedLanguage?: string;
  onLanguageChange?: (languageCode: string) => void;
}

const DEFAULT_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
  },
];

export default function LanguageSettings({
  languages = DEFAULT_LANGUAGES,
  selectedLanguage = "en",
  onLanguageChange,
}: LanguageSettingsProps) {
  const [selected, setSelected] =
    useState(selectedLanguage);

  const selectLanguage = (
    code: string
  ) => {
    setSelected(code);
    onLanguageChange?.(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Language
      </Text>

      <Text style={styles.subtitle}>
        Choose your preferred app language.
      </Text>

      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.card,
            selected === language.code &&
              styles.selectedCard,
          ]}
          activeOpacity={0.85}
          onPress={() =>
            selectLanguage(language.code)
          }
        >
          <View style={styles.left}>
            <Ionicons
              name="language-outline"
              size={22}
              color={Colors.primary}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {language.name}
              </Text>

              <Text
                style={styles.nativeName}
              >
                {language.nativeName}
              </Text>
            </View>
          </View>

          <Ionicons
            name={
              selected === language.code
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 12,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  textContainer: {
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  nativeName: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});