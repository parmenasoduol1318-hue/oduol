import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurriculumProgress } from '@types/index';

const STORAGE_KEY = 'oduol-curriculum-progress';

const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export default class ProgressService {
  static async save(progress: CurriculumProgress) {
    try {
      const raw = JSON.stringify(progress);
      if (isWeb) {
        window.localStorage.setItem(STORAGE_KEY, raw);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, raw);
      }
    } catch (e) {
      console.warn('Failed to save progress', e);
    }
  }

  static async load(): Promise<CurriculumProgress | null> {
    try {
      let raw: string | null = null;
      if (isWeb) {
        raw = window.localStorage.getItem(STORAGE_KEY);
      } else {
        raw = await AsyncStorage.getItem(STORAGE_KEY);
      }
      if (!raw) return null;
      return JSON.parse(raw) as CurriculumProgress;
    } catch (e) {
      console.warn('Failed to load progress', e);
      return null;
    }
  }

  static async clear() {
    try {
      if (isWeb) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to clear progress', e);
    }
  }
}
