import { generateId } from '../../src/utils/keyGenerator';
import { serialize, deserialize } from '../../src/utils/serializer';

describe('Utils', () => {
    describe('generateId', () => {
        it('should generate a string id', () => {
            const id = generateId();
            expect(typeof id).toBe('string');
        });

        it('should generate unique ids', () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
        });
    });

    describe('serializer', () => {
        it('should serialize and deserialize data correctly', () => {
            const testData = { 
                string: 'test',
                number: 123,
                boolean: true,
                array: [1,2,3],
                object: {a: 1, b: 2}
            };
            
            const serialized = serialize(testData);
            const deserialized = deserialize(serialized);
            
            expect(deserialized).toEqual(testData);
        });

        it('should handle null and undefined', () => {
            expect(deserialize(serialize(null))).toBeNull();
            expect(deserialize(serialize(undefined))).toBeNull();
        });
    });
});