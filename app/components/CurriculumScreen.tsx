import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from 'frontend/store/appStore';

const CurriculumScreen = () => {
  const router = useRouter();
  const curriculum = useAppStore((s) => s.curriculumProgress);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const modules = [
    { id: 'note-reading', name: 'Module 1 — Note Reading', route: 'module1', icon: '🎵' },
    { id: 'rhythm-meter', name: 'Module 2 — Rhythm & Meter', route: 'module2', icon: '⏱️' },
    { id: 'scales-keys', name: 'Module 3 — Scales & Key Signatures', route: 'module3', icon: '🎹' },
  ];

  const getProgressText = (moduleId: string) => {
    const prog = curriculum.modules[moduleId];
    if (!prog) return 'Not started';
    return `${prog.lessonsCompleted} / ${prog.lessonsTotal} lessons`;
  };

  const isUnlocked = (moduleId: string) => curriculum.modulesUnlocked.includes(moduleId);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Piano Curriculum
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#aaa' : '#666' }]}>
          Complete piano learning from beginner to advanced
        </Text>
      </View>

      <View style={styles.modulesContainer}>
        {modules.map((module) => {
          const unlocked = isUnlocked(module.id);
          return (
            <TouchableOpacity
              key={module.id}
              onPress={() => (unlocked ? router.push(module.route as any) : null)}
              disabled={!unlocked}
              style={[
                styles.moduleCard,
                {
                  backgroundColor: isDark ? '#2a2a2a' : '#fff',
                  opacity: unlocked ? 1 : 0.6,
                },
              ]}
            >
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleIcon}>{module.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.moduleName, { color: isDark ? '#fff' : '#000' }]}>
                    {module.name}
                  </Text>
                  <Text style={[styles.moduleProgress, { color: isDark ? '#aaa' : '#666' }]}>
                    {getProgressText(module.id)}
                  </Text>
                </View>
              </View>

              {!unlocked && (
                <Text style={[styles.lockedBadge, { color: isDark ? '#ff9800' : '#ff6b35' }]}>
                  🔒 Locked
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.infoBox, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.infoTitle, { color: isDark ? '#fff' : '#000' }]}>
          💡 How it works
        </Text>
        <Text style={[styles.infoText, { color: isDark ? '#aaa' : '#666' }]}>
          Complete lessons and exercises to unlock new modules. Your progress is saved automatically.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  modulesContainer: {
    gap: 12,
    marginBottom: 20,
  },
  moduleCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  moduleIcon: {
    fontSize: 28,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  moduleProgress: {
    fontSize: 12,
  },
  lockedBadge: {
    marginTop: 8,
    fontWeight: '600',
  },
  infoBox: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
});

export default CurriculumScreen;
