import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme, Share, Alert } from 'react-native';
import { useAppStore } from 'frontend/store/appStore';
import { getTranslation } from '../frontend/locales/i18n';

export default function FavoritesScreen() {
  const settings = useAppStore((state) => state.settings);
  const favorites = useAppStore((state) => state.favorites);
  const removeFavoriteReply = useAppStore((state) => state.removeFavoriteReply);

  const t = getTranslation(settings.preferredLanguage as 'en' | 'sw' | 'fr' | 'ar');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark' || settings.theme === 'dark';

  const handleCopy = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const handleDelete = (replyId: string) => {
    Alert.alert('Delete', 'Remove from favorites?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => removeFavoriteReply(replyId),
        style: 'destructive',
      },
    ]);
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
    replyCard: {
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#FFD700',
    },
    replyStyle: {
      fontSize: 12,
      backgroundColor: '#FFD700',
      color: '#000',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
      alignSelf: 'flex-start',
      marginBottom: 4,
      overflow: 'hidden',
    },
    replyContent: {
      fontSize: 14,
      color: isDark ? '#fff' : '#000',
      marginBottom: 8,
      lineHeight: 20,
    },
    replyActions: {
      flexDirection: 'row',
      gap: 8,
    },
    replyButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 4,
      backgroundColor: '#f0f0f0',
    },
    replyButtonText: {
      fontSize: 12,
      color: '#007AFF',
      fontWeight: '500',
    },
  });

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite replies yet. Start saving your best replies! ⭐</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.replyCard}>
          <Text style={styles.replyStyle}>{item.style}</Text>
          <Text style={styles.replyContent}>{item.content}</Text>
          <View style={styles.replyActions}>
            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => handleCopy(item.content)}
            >
              <Text style={styles.replyButtonText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.replyButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={[styles.replyButtonText, { color: '#FF3B30' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
