import { CurriculumProgress, ModuleProgress } from '@types/index';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface Certificate {
  module: string;
  earnedAt: number;
  score: number;
  level: 'bronze' | 'silver' | 'gold';
}

export default class BadgeGenerator {
  static generateBadges(progress: CurriculumProgress): Badge[] {
    const badges: Badge[] = [];

    // Badge 1: First Steps — unlock first module
    if (progress.modulesUnlocked.length > 0) {
      badges.push({
        id: 'first-steps',
        name: 'First Steps',
        description: 'Completed your first module',
        icon: '🌱',
        unlockedAt: Date.now(),
      });
    }

    // Badge 2: Rhythm Master — complete all lessons in Module 2
    const rhythmModule = progress.modules['rhythm-meter'];
    if (rhythmModule && rhythmModule.lessonsCompleted >= 3) {
      badges.push({
        id: 'rhythm-master',
        name: 'Rhythm Master',
        description: 'Completed all Rhythm & Meter lessons',
        icon: '🎵',
        unlockedAt: rhythmModule.lastCompletedAt,
      });
    }

    // Badge 3: Quick Learner — complete 5+ lessons total
    const totalLessons = Object.values(progress.modules).reduce(
      (sum, m) => sum + m.lessonsCompleted,
      0
    );
    if (totalLessons >= 5) {
      badges.push({
        id: 'quick-learner',
        name: 'Quick Learner',
        description: 'Completed 5+ lessons',
        icon: '⚡',
        unlockedAt: Date.now(),
      });
    }

    // Badge 4: Dedicated — complete 10+ lessons
    if (totalLessons >= 10) {
      badges.push({
        id: 'dedicated',
        name: 'Dedicated',
        description: 'Completed 10+ lessons',
        icon: '🎯',
        unlockedAt: Date.now(),
      });
    }

    // Badge 5: All-Rounder — unlock 3+ modules
    if (progress.modulesUnlocked.length >= 3) {
      badges.push({
        id: 'all-rounder',
        name: 'All-Rounder',
        description: 'Unlocked 3+ modules',
        icon: '🏆',
        unlockedAt: Date.now(),
      });
    }

    return badges;
  }

  static generateCertificates(progress: CurriculumProgress): Certificate[] {
    const certificates: Certificate[] = [];

    // Generate certificates for modules with good scores
    Object.entries(progress.modules).forEach(([moduleId, moduleProgress]) => {
      if (moduleProgress.score !== undefined && moduleProgress.score >= 70) {
        const level = this.scoreToLevel(moduleProgress.score);
        certificates.push({
          module: moduleId,
          earnedAt: moduleProgress.lastCompletedAt || Date.now(),
          score: moduleProgress.score,
          level,
        });
      }
    });

    return certificates;
  }

  private static scoreToLevel(score: number): 'bronze' | 'silver' | 'gold' {
    if (score >= 90) return 'gold';
    if (score >= 80) return 'silver';
    return 'bronze';
  }

  static generateCertificateText(moduleId: string, level: 'bronze' | 'silver' | 'gold', score: number): string {
    const moduleNames: Record<string, string> = {
      'note-reading': 'Note Reading',
      'rhythm-meter': 'Rhythm & Meter',
      'scales-keys': 'Scales & Key Signatures',
    };

    const levelText = {
      gold: 'with Distinction',
      silver: 'with Merit',
      bronze: 'Successfully',
    }[level];

    return `CERTIFICATE OF COMPLETION

This certifies that the holder has ${levelText} completed
the ${moduleNames[moduleId] || moduleId} module.

Score: ${score}%
Level: ${level.toUpperCase()}

Date: ${new Date().toLocaleDateString()}

Congratulations on your achievement!`;
  }
}
