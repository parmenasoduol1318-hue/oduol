// frontend/components/settings/PrivacySettings.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import Colors from "../../constants/colors";

interface PrivacySettingsProps {
  saveChatHistory?: boolean;
  allowMemory?: boolean;
  analyticsEnabled?: boolean;
  shareUsageData?: boolean;

  onSaveChatHistoryChange?: (value: boolean) => void;
  onAllowMemoryChange?: (value: boolean) => void;
  onAnalyticsChange?: (value: boolean) => void;
  onShareUsageDataChange?: (value: boolean) => void;
}

export default function PrivacySettings({
  saveChatHistory = true,
  allowMemory = true,
  analyticsEnabled = true,
  shareUsageData = false,
  onSaveChatHistoryChange,
  onAllowMemoryChange,
  onAnalyticsChange,
  onShareUsageDataChange,
}: PrivacySettingsProps) {
  const [chatHistory, setChatHistory] =
    useState(saveChatHistory);

  const [memory, setMemory] =
    useState(allowMemory);

  const [analytics, setAnalytics] =
    useState(analyticsEnabled);

  const [shareData, setShareData] =
    useState(shareUsageData);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Privacy & Security
      </Text>

      <PrivacyItem
        title="Save Chat History"
        description="Store your conversations so you can access them later."
        value={chatHistory}
        onValueChange={(value) => {
          setChatHistory(value);
          onSaveChatHistoryChange?.(value);
        }}
      />

      <PrivacyItem
        title="Enable AI Memory"
        description="Allow SwiftReply to remember useful information between chats."
        value={memory}
        onValueChange={(value) => {
          setMemory(value);
          onAllowMemoryChange?.(value);
        }}
      />

      <PrivacyItem
        title="Anonymous Analytics"
        description="Help improve SwiftReply by sharing anonymous usage statistics."
        value={analytics}
        onValueChange={(value) => {
          setAnalytics(value);
          onAnalyticsChange?.(value);
        }}
      />

      <PrivacyItem
        title="Share Usage Data"
        description="Share feature usage to improve future updates."
        value={shareData}
        onValueChange={(value) => {
          setShareData(value);
          onShareUsageDataChange?.(value);
        }}
      />
    </View>
  );
}

interface PrivacyItemProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function PrivacyItem({
  title,
  description,
  value,
  onValueChange,
}: PrivacyItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>

        <Text style={styles.cardDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#D1D5DB",
          true: Colors.primary,
        }}
        thumbColor="#FFFFFF"
      />
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
    padding: 18,
    marginBottom: 14,
  },

  textContainer: {
    flex: 1,
    paddingRight: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
});