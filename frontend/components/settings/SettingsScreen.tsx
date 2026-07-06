// frontend/components/settings/SettingsScreen.tsx

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

import AccountSettings from "./AccountSettings";
import AppearanceSettings from "./AppearanceSettings";
import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";
import LanguageSettings from "./LanguageSettings";
import AboutSettings from "./AboutSettings";
import DangerZone from "./DangerZone";

interface SettingsScreenProps {
  user: {
    name: string;
    email: string;
    isPro?: boolean;
  };

  onEditProfile?: () => void;
  onChangePassword?: () => void;
  onManageSubscription?: () => void;

  onLogout?: () => void;
  onDeleteAccount?: () => void;

  onThemeChange?: (
    theme: "system" | "light" | "dark"
  ) => void;

  onLanguageChange?: (
    language: string
  ) => void;
}

export default function SettingsScreen({
  user,
  onEditProfile,
  onChangePassword,
  onManageSubscription,
  onLogout,
  onDeleteAccount,
  onThemeChange,
  onLanguageChange,
}: SettingsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AccountSettings
          name={user.name}
          email={user.email}
          isPro={user.isPro}
          onEditProfile={onEditProfile}
          onChangePassword={onChangePassword}
          onManageSubscription={
            onManageSubscription
          }
        />

        <AppearanceSettings
          onThemeChange={onThemeChange}
        />

        <NotificationSettings />

        <PrivacySettings />

        <LanguageSettings
          onLanguageChange={
            onLanguageChange
          }
        />

        <AboutSettings />

        <DangerZone
          onLogout={onLogout}
          onDeleteAccount={
            onDeleteAccount
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },
});