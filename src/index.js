import { StorageWrapper } from './core';

/**
 * DoltStore Library entry point
 * @param {string} schemaName - The name of the schema (used for localStorage)
 * @returns {StorageWrapper} The storage wrapper instance
 */
function DoltDBStore(schemaName) {
  return new StorageWrapper(schemaName);
}

export default DoltDBStore;
