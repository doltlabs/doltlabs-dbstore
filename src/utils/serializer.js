/**
 * Serializes an object into a JSON string for localStorage
 * @param {Object} data - The object to serialize
 * @returns {string} The serialized object
 */
export function serialize(data) {
    return JSON.stringify(data);
  }
  
  /**
   * Deserializes a JSON string back into an object
   * @param {string} data - The JSON string to deserialize
   * @returns {Object} The deserialized object
   */
  export function deserialize(data) {
    return JSON.parse(data);
  }
  