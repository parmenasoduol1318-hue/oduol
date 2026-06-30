import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
  Alert,
  Picker,
} from 'react-native';
import { useAppStore } from 'frontend/store/appStore';
import { getTranslation, Language } from './locales/i18n';
import { ReplyStyle } from '@types/index';
import ExportService from '@services/ExportService';
import BadgeGenerator from '@services/BadgeGenerator';
import ProgressService from '@services/ProgressService';

const SettingsScreen = () => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const setApiKey = useAppStore((state) => state.setApiKey);
  const setPreferredLanguage = useAppStore((state) => state.setPreferredLanguage);
  const setPreferredReplyStyle = useAppStore((state) => state.setPreferredReplyStyle);
  const setTheme = useAppStore((state) => state.setTheme);

  const [apiKey, setApiKeyLocal] = useState(settings.openaiApiKey);
  const [language, setLanguageLocal] = useState(settings.preferredLanguage);
  const [replyStyle, setReplyStyleLocal] = useState(settings.preferredReplyStyle);
  const [theme, setThemeLocal] = useState(settings.theme);

  const t = getTranslation(language as Language);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark' || theme === 'dark';

  const handleSaveSettings = () => {
    setApiKey(apiKey);
    setPreferredLanguage(language);
    setPreferredReplyStyle(replyStyle as ReplyStyle);
    setTheme(theme as 'light' | 'dark' | 'auto');
    updateSettings({
      openaiApiKey: apiKey,
      preferredLanguage: language,
      preferredReplyStyle: replyStyle as ReplyStyle,
      theme: theme as 'light' | 'dark' | 'auto',
    });
    Alert.alert('Success', t.settings.saved);
  };

  const handleExport = async () => {
    try {
      const json = await ExportService.exportProgressJSON();
      // On web, trigger download. On native, copy to clipboard or show text.
      if (typeof window !== 'undefined' && window.navigator?.msSaveOrOpenBlob) {
        const blob = new Blob([json], { type: 'application/json' });
        (window.navigator as any).msSaveOrOpenBlob(blob, ExportService.generateDownloadFilename());
      } else if (typeof window !== 'undefined') {
        const a = document.createElement('a');
        const file = new Blob([json], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = ExportService.generateDownloadFilename();
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        Alert.alert('Export', 'Progress JSON ready. (On native, copy from debug logs)');
      }
    } catch (e) {
      Alert.alert('Export failed', String(e));
    }
  };

  const handleViewBadges = async () => {
    try {
      const progress = (await ProgressService.load()) || useAppStore.getState().curriculumProgress;
      const badges = BadgeGenerator.generateBadges(progress);
      Alert.alert('Badges', badges.map((b) => `${b.icon} ${b.name} — ${b.description}`).join('\n'));
    } catch (e) {
      Alert.alert('Error', 'Unable to load badges');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
    },
    section: {
      marginBottom: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#ddd',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#aaa' : '#666',
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? '#333' : '#ddd',
      borderRadius: 8,
      padding: 12,
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      color: isDark ? '#fff' : '#000',
      marginBottom: 12,
      minHeight: 44,
    },
    picker: {
      borderWidth: 1,
      borderColor: isDark ? '#333' : '#ddd',
      borderRadius: 8,
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      marginBottom: 12,
      color: isDark ? '#fff' : '#000',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: isDark ? '#333' : '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 12,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 12,
      color: isDark ? '#999' : '#999',
      marginTop: 4,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Configuration</Text>
        <Text style={styles.label}>{t.settings.apiKey}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.settings.apiKeyPlaceholder}
          placeholderTextColor={isDark ? '#666' : '#ccc'}
          value={apiKey}
          onChangeText={setApiKeyLocal}
          secureTextEntry
        />
        <Text style={styles.description}>
          Get your API key from OpenAI (https://platform.openai.com/api-keys)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings.language}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={language}
            onValueChange={setLanguageLocal}
            style={styles.picker}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Swahili" value="sw" />
            <Picker.Item label="Français" value="fr" />
            <Picker.Item label="العربية" value="ar" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings.replyStyle}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={replyStyle}
            onValueChange={setReplyStyleLocal}
            style={styles.picker}
          >
            <Picker.Item label="Short" value="short" />
            <Picker.Item label="Friendly" value="friendly" />
            <Picker.Item label="Formal" value="formal" />
            <Picker.Item label="Funny" value="funny" />
            <Picker.Item label="Creative" value="creative" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings.theme}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={theme}
            onValueChange={setThemeLocal}
            style={styles.picker}
          >
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
            <Picker.Item label="Auto" value="auto" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
        <Text style={styles.buttonText}>{t.settings.save}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 16 }}>
        <TouchableOpacity style={styles.button} onPress={handleExport}>
          <Text style={styles.buttonText}>Export Progress (JSON)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={handleViewBadges}>
          <Text style={styles.buttonText}>View Badges</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
