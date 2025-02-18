import { serialize, deserialize } from "../src/utils";

describe('Serializer', () => {
  const testObject = { name: 'test', value: 123, nested: { foo: 'bar' } };
  const testString = '{"name":"test","value":123,"nested":{"foo":"bar"}}';

  describe('serialize', () => {
    test('should serialize an object to JSON string', () => {
      expect(serialize(testObject)).toBe(testString);
    });

    test('should handle empty objects', () => {
      expect(serialize({})).toBe('{}');
    });

    test('should handle null', () => {
      expect(serialize(null)).toBe('null');
    });
  });

  describe('deserialize', () => {
    test('should deserialize JSON string to object', () => {
      expect(deserialize(testString)).toEqual(testObject);
    });

    test('should handle empty JSON objects', () => {
      expect(deserialize('{}')).toEqual({});
    });

    test('should throw error for invalid JSON', () => {
      expect(() => deserialize('invalid')).toThrow();
    });
  });
});