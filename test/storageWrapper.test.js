// test/storageWrapper.test.js

import StorageWrapper from '../src/core/storageWrapper';  // Adjust the import based on the file location

describe('StorageWrapper', () => {
  let db;

  // Mocking localStorage for Jest tests
  beforeEach(() => {
    // Mocking localStorage methods
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    // Initialize the StorageWrapper
    db = new StorageWrapper('users');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('save() stores data correctly in localStorage', () => {
    const user = { username: 'john_doe', email: 'john@example.com' };

    db.save(user);

    // Check if localStorage.setItem was called with correct arguments
    expect(localStorage.setItem).toHaveBeenCalledWith('users_data', expect.any(String));
  });

  test('get() retrieves stored data correctly by ID', () => {
    const user = { id: '123', username: 'john_doe', email: 'john@example.com' };

    // Mocking localStorage.getItem to return the user data
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([user]));

    const result = db.get('123');
    
    expect(result).toEqual(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('save() stores data correctly in localStorage', () => {
    const user = { username: 'john_doe', email: 'john@example.com' };

    db.save(user);

    // Check if localStorage.setItem was called with correct arguments
    expect(localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify(user));
  });

  test('get() retrieves stored data correctly by ID', () => {
    const user = { username: 'john_doe', email: 'john@example.com' };

    // Mocking localStorage.getItem to return the user data
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(user));

    const result = db.get(); // Assuming 'get()' gets the data by the key 'users'
    
    expect(result).toEqual(user);
    expect(localStorage.getItem).toHaveBeenCalledWith('users');
  });

  test('delete() removes data correctly from localStorage', () => {
    db.delete();

    // Check if localStorage.removeItem was called with correct arguments
    expect(localStorage.removeItem).toHaveBeenCalledWith('users');
  });
});
