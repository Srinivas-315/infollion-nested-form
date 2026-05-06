/**
 * LocalStorage persistence helpers for the questions tree.
 * Saves/loads the entire recursive tree as JSON.
 */

const STORAGE_KEY = "infollion_nested_questions";

/**
 * Save questions array to localStorage.
 */
export function saveQuestions(questions) {
  try {
    const json = JSON.stringify(questions);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (err) {
    console.warn("Failed to save questions to localStorage:", err);
  }
}

/**
 * Load questions array from localStorage.
 * Returns empty array if nothing is stored or on error.
 */
export function loadQuestions() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load questions from localStorage:", err);
    return [];
  }
}

/**
 * Clear saved questions from localStorage.
 */
export function clearQuestions() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear localStorage:", err);
  }
}
