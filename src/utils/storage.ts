const storage = {
  save: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving "${key}" to storage:`, e);
    }
  },

  get: <T = unknown>(key: string): T | undefined => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : undefined;
    } catch (e) {
      console.error(`Error reading "${key}" from storage:`, e);
      return undefined;
    }
  },

  delete: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error deleting "${key}" from storage:`, e);
    }
  }
};

export default storage;
