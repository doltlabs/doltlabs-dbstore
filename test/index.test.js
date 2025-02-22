import DoltDBStore from '../src/index';
import { StorageWrapper } from '../src/core';

describe('DoltDBStore', () => {
    it('should be a function', () => {
        expect(typeof DoltDBStore).toBe('function');
    });

    it('should return a StorageWrapper instance', () => {
        const store = DoltDBStore('test-schema');
        expect(store).toBeInstanceOf(StorageWrapper);
    });

    it('should pass schema name to StorageWrapper', () => {
        const schemaName = 'test-schema';
        const store = DoltDBStore(schemaName);
        expect(store.schemaName).toBe(schemaName);
    });

    it('should create different instances for different schema names', () => {
        const store1 = DoltDBStore('schema1');
        const store2 = DoltDBStore('schema2');
        expect(store1).not.toBe(store2);
        expect(store1.schemaName).not.toBe(store2.schemaName);
    });
});