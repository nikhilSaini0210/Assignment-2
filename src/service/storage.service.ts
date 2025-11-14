import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageResult<T> = {
  success: boolean;
  data?: T | null;
  error?: string;
};

class StorageService {
  static async setItem(key: string, value: any): Promise<StorageResult<null>> {
    try {
      if (!key) {
        return { success: false, error: 'Storage key is required' };
      }
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      return { success: true, data: null };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to set item' };
    }
  }

  static async getItem<T = any>(key: string): Promise<StorageResult<T | null>> {
    try {
      if (!key) {
        return { success: false, error: 'Storage key is required', data: null };
      }
      const value = await AsyncStorage.getItem(key);
      if (value === null) return { success: true, data: null };
      try {
        return { success: true, data: JSON.parse(value) };
      } catch {
        // Return raw string if JSON parsing fails
        return { success: true, data: value as unknown as T };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get item',
        data: null,
      };
    }
  }

  static async removeItem(key: string): Promise<StorageResult<null>> {
    try {
      if (!key) {
        return { success: false, error: 'Storage key is required' };
      }
      await AsyncStorage.removeItem(key);
      return { success: true, data: null };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to remove item',
      };
    }
  }

  static async clear(): Promise<StorageResult<null>> {
    try {
      await AsyncStorage.clear();
      return { success: true, data: null };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to clear storage',
      };
    }
  }

  static async hasKey(key: string): Promise<StorageResult<boolean>> {
    try {
      if (!key) {
        return {
          success: false,
          error: 'Storage key is required',
          data: false,
        };
      }
      const keys = await AsyncStorage.getAllKeys();
      return { success: true, data: keys.includes(key) };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to check key',
        data: false,
      };
    }
  }
}

export default StorageService;
