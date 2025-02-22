import StorageWrapper from '../../src/core/storageWrapper';
import 'jest-localstorage-mock';

describe('StorageWrapper', () => {
    let storage;
    
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        storage = new StorageWrapper('test');
    });

    describe('constructor', () => {
        test('should create instance with correct schema name', () => {
            expect(storage.schemaName).toBe('test');
            expect(storage.storageKey).toBe('test_data');
        });
    });

    describe('save', () => {
        test('should save data with generated ID if none provided', () => {
            const data = { name: 'Test' };
            const saved = storage.save(data);
            expect(saved.id).toBeDefined();
            expect(saved.name).toBe('Test');
        });

        test('should save data with provided ID', () => {
            const data = { id: '123', name: 'Test' };
            const saved = storage.save(data);
            expect(saved.id).toBe('123');
        });
    });

    describe('get', () => {
        test('should return null for non-existent ID', () => {
            expect(storage.get('nonexistent')).toBeNull();
        });

        test('should retrieve saved data by ID', () => {
            const data = { name: 'Test' };
            const saved = storage.save(data);
            const retrieved = storage.get(saved.id);
            expect(retrieved).toEqual(saved);
        });
    });

    describe('update', () => {
        test('should return null for non-existent ID', () => {
            expect(storage.update('nonexistent', { name: 'Updated' })).toBeNull();
        });

        test('should update existing data', () => {
            const data = { name: 'Test' };
            const saved = storage.save(data);
            const updated = storage.update(saved.id, { name: 'Updated' });
            expect(updated.name).toBe('Updated');
            expect(updated.updatedAt).toBeDefined();
        });
    });

    describe('delete', () => {
        test('should return false for non-existent ID', () => {
            expect(storage.delete('nonexistent')).toBe(false);
        });

        test('should delete existing data', () => {
            const data = { name: 'Test' };
            const saved = storage.save(data);
            expect(storage.delete(saved.id)).toBe(true);
            expect(storage.get(saved.id)).toBeNull();
        });
    });

    describe('getAll', () => {
        test('should return empty array when no data exists', () => {
            expect(storage.getAll()).toEqual([]);
        });

        test('should return all saved data', () => {
            const data1 = storage.save({ name: 'Test 1' });
            const data2 = storage.save({ name: 'Test 2' });
            const all = storage.getAll();
            expect(all).toHaveLength(2);
            expect(all).toContainEqual(data1);
            expect(all).toContainEqual(data2);
        });
    });
});