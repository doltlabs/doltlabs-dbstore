import { StorageWrapper } from '../../src/core';

describe('Core exports', () => {
    test('should export StorageWrapper', () => {
        expect(StorageWrapper).toBeDefined();
    });

    test('StorageWrapper should be a constructor/class', () => {
        expect(typeof StorageWrapper).toBe('function');
    });

    test('should be able to instantiate StorageWrapper', () => {
        const wrapper = new StorageWrapper();
        expect(wrapper).toBeInstanceOf(StorageWrapper);
    });
});