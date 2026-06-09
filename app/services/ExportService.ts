import { CurriculumProgress } from '@types/index';
import ProgressService from './ProgressService';

interface ExportData {
  version: string;
  exportedAt: number;
  curriculum: CurriculumProgress;
}

export default class ExportService {
  static async exportProgressJSON(): Promise<string> {
    try {
      const progress = await ProgressService.load();
      if (!progress) {
        throw new Error('No progress data found');
      }

      const exportData: ExportData = {
        version: '1.0',
        exportedAt: Date.now(),
        curriculum: progress,
      };

      return JSON.stringify(exportData, null, 2);
    } catch (e) {
      console.error('Failed to export progress', e);
      throw e;
    }
  }

  static async importProgressJSON(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString) as ExportData;

      if (!data.curriculum || !Array.isArray(data.curriculum.modulesUnlocked)) {
        throw new Error('Invalid progress data format');
      }

      await ProgressService.save(data.curriculum);
      return true;
    } catch (e) {
      console.error('Failed to import progress', e);
      throw e;
    }
  }

  static generateDownloadFilename(): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    return `oduol-progress-${date}-${time}.json`;
  }
}
