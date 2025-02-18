import { generateId } from '../utils';
import { serialize, deserialize } from '../utils';

/**
 * Wrapper for interacting with localStorage for CRUD operations
 */
class StorageWrapper {
  constructor(schemaName) {
    this.schemaName = schemaName;
    this.storageKey = `${schemaName}_data`; // Define a unique storage key for each schema
  }

  /**
   * Saves a new data entry to localStorage
   * @param {Object} data - The data object to save
   * @returns {Object} The saved data
   */
  save(data) {
    const storedData = this.getAll() || [];

    // Ensure the entry always has a unique ID
    const entry = { ...data, id: data.id ?? generateId() };

    storedData.push(entry);
    localStorage.setItem(this.storageKey, serialize(storedData));

    return entry;
  }




  /**
   * Retrieves a data entry by its ID
   * @param {string} id - The unique ID of the entry
   * @returns {Object|null} The found entry or null if not found
   */
  get(id) {
    const storedData = this.getAll();
    return storedData ? storedData.find(item => item.id === id) : null;
  }

  /**
   * Updates an existing data entry in localStorage
   * @param {string} id - The ID of the entry to update
   * @param {Object} newData - The updated data
   * @returns {Object|null} The updated entry or null if not found
   */
  update(id, newData) {
    const storedData = this.getAll();
    const index = storedData.findIndex(item => item.id === id);
    if (index === -1) return null;

    storedData[index] = { ...storedData[index], ...newData, updatedAt: new Date() };
    localStorage.setItem(this.storageKey, serialize(storedData));
    return storedData[index];
  }

  /**
   * Deletes a data entry by its ID
   * @param {string} id - The unique ID of the entry to delete
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    const storedData = this.getAll();
    const index = storedData.findIndex(item => item.id === id);
    if (index === -1) return false;

    storedData.splice(index, 1);
    localStorage.setItem(this.storageKey, serialize(storedData));
    return true;
  }

  /**
   * Retrieves all data entries from localStorage
   * @returns {Array} An array of all stored entries
   */
  getAll() {
    const data = localStorage.getItem(this.storageKey);
    return data ? deserialize(data) : [];
  }
}

export default StorageWrapper;
