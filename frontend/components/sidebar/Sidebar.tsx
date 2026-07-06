// frontend/components/sidebar/Sidebar.tsx

import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import Colors from "../../constants/colors";

import SidebarHeader from "./SidebarHeader";
import SearchChats from "./SearchChats";
import NewChatButton from "./NewChatButton";
import ChatHistory from "./ChatHistory";
import SidebarFooter from "./SidebarFooter";
import { HistoryItemProps } from "./HistoryItem";

interface SidebarProps {
  chats: HistoryItemProps[];
  selectedChatId?: string;

  userName: string;
  userEmail: string;
  isPro?: boolean;

  onNewChat: () => void;
  onSearch?: (query: string) => void;
  onChatPress?: (
    chat: HistoryItemProps
  ) => void;
  onRenameChat?: (
    chat: HistoryItemProps
  ) => void;
  onDeleteChat?: (
    chat: HistoryItemProps
  ) => void;

  onProfile?: () => void;
  onSettings?: () => void;
  onUpgrade?: () => void;
  onLogout?: () => void;
}

export default function Sidebar({
  chats,
  selectedChatId,
  userName,
  userEmail,
  isPro = false,
  onNewChat,
  onSearch,
  onChatPress,
  onRenameChat,
  onDeleteChat,
  onProfile,
  onSettings,
  onUpgrade,
  onLogout,
}: SidebarProps) {
  return (
    <SafeAreaView style={styles.container}>
      <SidebarHeader />

      <SearchChats
        onSearch={onSearch}
      />

      <NewChatButton
        onPress={onNewChat}
      />

      <View style={styles.history}>
        <ChatHistory
          chats={chats}
          selectedChatId={
            selectedChatId
          }
          onChatPress={onChatPress}
          onRenameChat={
            onRenameChat
          }
          onDeleteChat={
            onDeleteChat
          }
        />
      </View>

      <SidebarFooter
        userName={userName}
        userEmail={userEmail}
        isPro={isPro}
        onProfile={onProfile}
        onSettings={onSettings}
        onUpgrade={onUpgrade}
        onLogout={onLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },

  history: {
    flex: 1,
    marginTop: 8,
    marginBottom: 16,
  },
});