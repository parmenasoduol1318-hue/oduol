import React from 'react';
import { View, Text, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { useAppStore } from '@store/appStore';
import { getTranslation } from '@locales/i18n';

export default function HistoryScreen() {
  const settings = useAppStore((state) => state.settings);
  const recentMessages = useAppStore((state) => state.recentMessages);

  const t = getTranslation(settings.preferredLanguage as 'en' | 'sw' | 'fr' | 'ar');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark' || settings.theme === 'dark';

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    emptyText: {
      fontSize: 16,
      color: isDark ? '#999' : '#666',
      textAlign: 'center',
    },
    messageCard: {
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#007AFF',
    },
    messageContent: {
      fontSize: 14,
      color: isDark ? '#fff' : '#000',
      marginBottom: 8,
      lineHeight: 20,
    },
    messageDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailBadge: {
      flexDirection: 'row',
      gap: 8,
    },
    badge: {
      backgroundColor: '#e0e0e0',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
    },
    badgeText: {
      fontSize: 11,
      color: '#333',
      fontWeight: '600',
    },
    timestamp: {
      fontSize: 11,
      color: isDark ? '#999' : '#999',
    },
  });

  if (recentMessages.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No message history yet. Start analyzing messages! 📝</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={recentMessages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.messageCard}>
          <Text style={styles.messageContent}>{item.content}</Text>
          <View style={styles.messageDetails}>
            <View style={styles.detailBadge}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t.tones[item.detectedTone]}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{t.intents[item.detectedIntent]}</Text>
              </View>
            </View>
            <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
          </View>
        </View>
      )}
      inverted
    />
  );
}
