import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Share,
  Alert,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useAppStore } from '@store/appStore';
import ReplyService from '@services/ReplyService';


import { getTranslation } from './locales/i18n';
import { Reply, MessageTone, MessageIntent } from '@types/index';
import Metronome from './Metronome';

const HomeScreen = () => {
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectedTone, setDetectedTone] = useState<MessageTone | null>(null);
  const [detectedIntent, setDetectedIntent] = useState<MessageIntent | null>(
    null
  );
  const [replies, setReplies] = useState<Reply[]>([]);

  const settings = useAppStore((state) => state.settings);
  const addMessage = useAppStore((state) => state.addMessage);
  const addSuggestedReplies = useAppStore((state) => state.addSuggestedReplies);
  const addFavoriteReply = useAppStore((state) => state.addFavoriteReply);

  const t = getTranslation(settings.preferredLanguage as 'en' | 'sw' | 'fr' | 'ar');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const analyzeMessage = useCallback(async () => {
    if (!messageInput.trim()) {
      Alert.alert('Error', 'Please enter a message to analyze');
      return;
    }

    if (!settings.openaiApiKey) {
      Alert.alert('Configuration Required', 'Please add your OpenAI API key in settings first');
      return;
    }

    setLoading(true);

    try {
      const replyService = new ReplyService(settings.openaiApiKey);

      // Analyze message
      const analysis = await replyService.analyzeMessage(
        messageInput,
        settings.preferredLanguage
      );

      setDetectedTone(analysis.tone);
      setDetectedIntent(analysis.intent);

      // Generate replies
      const suggestedReplies = await replyService.generateReplies(
        messageInput,
        analysis.tone,
        analysis.intent,
        settings.preferredLanguage,
        [
          'short',
          'friendly',
          'formal',
          'funny',
          'creative',
        ]
      );

      setReplies(suggestedReplies);

      // Store in history
      addMessage({
        id: `msg-${Date.now()}`,
        content: messageInput,
        detectedTone: analysis.tone,
        detectedIntent: analysis.intent,
        language: settings.preferredLanguage,
        timestamp: Date.now(),
      });

      addSuggestedReplies({
        messageId: `msg-${Date.now()}`,
        replies: suggestedReplies,
        generatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error analyzing message:', error);
      Alert.alert('Error', 'Failed to analyze message. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [messageInput, settings, addMessage, addSuggestedReplies]);

  const copyToClipboard = async (text: string) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const handleAddFavorite = (reply: Reply) => {
    addFavoriteReply(reply);
    Alert.alert('Success', t.home.addFavorite);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
    },
    inputSection: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? '#333' : '#ddd',
      borderRadius: 8,
      padding: 12,
      minHeight: 100,
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      color: isDark ? '#fff' : '#000',
      textAlignVertical: 'top',
      marginBottom: 12,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    analysisSection: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      borderRadius: 8,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDark ? '#aaa' : '#666',
      marginBottom: 4,
    },
    value: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#fff' : '#000',
      marginBottom: 8,
    },
    repliesSection: {
      flex: 1,
    },
    replyCard: {
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      padding: 12,
      marginBottom: 8,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#007AFF',
    },
    replyStyle: {
      fontSize: 12,
      backgroundColor: '#007AFF',
      color: '#fff',
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
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder={t.home.placeholder}
          placeholderTextColor={isDark ? '#666' : '#ccc'}
          value={messageInput}
          onChangeText={setMessageInput}
          multiline
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
          onPress={analyzeMessage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? t.home.analyzing : t.home.analyze}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Metronome / Rhythm tool */}
      <View style={{ marginTop: 16 }}>
        <Metronome />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {detectedTone && detectedIntent && !loading && (
        <>
          <View style={styles.analysisSection}>
            <Text style={styles.label}>{t.home.tone}</Text>
            <Text style={styles.value}>{t.tones[detectedTone]}</Text>

            <Text style={styles.label}>{t.home.intent}</Text>
            <Text style={styles.value}>{t.intents[detectedIntent]}</Text>
          </View>

          <View style={styles.repliesSection}>
            <Text style={[styles.label, { marginBottom: 12 }]}>
              {t.home.replies}
            </Text>

            {replies.map((reply) => (
              <View key={reply.id} style={styles.replyCard}>
                <Text style={styles.replyStyle}>{reply.style}</Text>
                <Text style={styles.replyContent}>{reply.content}</Text>
                <View style={styles.replyActions}>
                  <TouchableOpacity
                    style={styles.replyButton}
                    onPress={() => copyToClipboard(reply.content)}
                  >
                    <Text style={styles.replyButtonText}>{t.home.copy}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.replyButton}
                    onPress={() => handleAddFavorite(reply)}
                  >
                    <Text style={styles.replyButtonText}>⭐</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
