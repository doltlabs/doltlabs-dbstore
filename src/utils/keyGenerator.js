/**
 * Generates a unique ID based on the schema class
 * @returns {string} The generated ID
 */
export function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  }
  