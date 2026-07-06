// frontend/components/settings/NotificationSettings.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import Colors from "../../constants/colors";

interface NotificationSettingsProps {
  pushEnabled?: boolean;
  emailEnabled?: boolean;
  marketingEnabled?: boolean;
  reminderEnabled?: boolean;

  onPushChange?: (value: boolean) => void;
  onEmailChange?: (value: boolean) => void;
  onMarketingChange?: (value: boolean) => void;
  onReminderChange?: (value: boolean) => void;
}

export default function NotificationSettings({
  pushEnabled = true,
  emailEnabled = true,
  marketingEnabled = false,
  reminderEnabled = true,
  onPushChange,
  onEmailChange,
  onMarketingChange,
  onReminderChange,
}: NotificationSettingsProps) {
  const [push, setPush] = useState(pushEnabled);
  const [email, setEmail] = useState(emailEnabled);
  const [marketing, setMarketing] = useState(marketingEnabled);
  const [reminders, setReminders] = useState(reminderEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notifications
      </Text>

      <SettingSwitch
        title="Push Notifications"
        description="Receive important updates on your device."
        value={push}
        onValueChange={(value) => {
          setPush(value);
          onPushChange?.(value);
        }}
      />

      <SettingSwitch
        title="Email Notifications"
        description="Receive account and security emails."
        value={email}
        onValueChange={(value) => {
          setEmail(value);
          onEmailChange?.(value);
        }}
      />

      <SettingSwitch
        title="Marketing Messages"
        description="Receive promotions, offers and new features."
        value={marketing}
        onValueChange={(value) => {
          setMarketing(value);
          onMarketingChange?.(value);
        }}
      />

      <SettingSwitch
        title="Daily Reminders"
        description="Receive reminders to continue conversations."
        value={reminders}
        onValueChange={(value) => {
          setReminders(value);
          onReminderChange?.(value);
        }}
      />
    </View>
  );
}

interface SettingSwitchProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingSwitch({
  title,
  description,
  value,
  onValueChange,
}: SettingSwitchProps) {
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});