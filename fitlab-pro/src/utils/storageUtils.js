// In-memory storage utilities (replacing localStorage for artifacts)

// In-memory storage object
const memoryStorage = {
  workouts: [],
  injuries: [],
  medical: {},
  badges: [],
  aiResponses: {},
  quizScores: [],
  settings: {
    theme: 'light',
    weight: 70,
    height: 170,
    age: 25,
    gender: 'male'
  }
};

// Save to memory storage
export const saveToStorage = (key, data) => {
  try {
    memoryStorage[key] = data;
    return true;
  } catch (error) {
    console.error('Error saving to storage:', error);
    return false;
  }
};

// Get from memory storage
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const data = memoryStorage[key];
    return data !== undefined ? data : defaultValue;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return defaultValue;
  }
};

// Remove from memory storage
export const removeFromStorage = (key) => {
  try {
    delete memoryStorage[key];
    return true;
  } catch (error) {
    console.error('Error removing from storage:', error);
    return false;
  }
};

// Clear all storage
export const clearAllStorage = () => {
  try {
    Object.keys(memoryStorage).forEach(key => {
      if (key === 'settings') {
        // Keep default settings
        memoryStorage.settings = {
          theme: 'light',
          weight: 70,
          height: 170,
          age: 25,
          gender: 'male'
        };
      } else {
        memoryStorage[key] = Array.isArray(memoryStorage[key]) ? [] : {};
      }
    });
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Get all storage data
export const getAllStorage = () => {
  return { ...memoryStorage };
};

// Initialize storage with default data
export const initializeStorage = () => {
  if (!memoryStorage.workouts) memoryStorage.workouts = [];
  if (!memoryStorage.injuries) memoryStorage.injuries = [];
  if (!memoryStorage.medical) memoryStorage.medical = {};
  if (!memoryStorage.badges) memoryStorage.badges = [];
  if (!memoryStorage.aiResponses) memoryStorage.aiResponses = {};
  if (!memoryStorage.quizScores) memoryStorage.quizScores = [];
  if (!memoryStorage.settings) {
    memoryStorage.settings = {
      theme: 'light',
      weight: 70,
      height: 170,
      age: 25,
      gender: 'male'
    };
  }
};