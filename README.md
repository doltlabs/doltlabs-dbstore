# Dolt Labs dbStore - Offline-First Key-Value Database Wrapper

**dbStore** is a lightweight JavaScript library that provides a wrapper around browser's `localStorage` for offline-first applications. It offers CRUD operations with automatic ID generation and JSON serialization.

### Features

- **Offline-First**: Persistent browser storage using `localStorage`
- **Simple API**: Basic CRUD operations with minimal setup
- **Automatic ID Generation**: Built-in unique ID generation for data entries
- **JSON Serialization**: Automatic object serialization/deserialization for complex data types
- **Zero Dependencies**: Lightweight and standalone implementation
- **Type Safety**: Optional TypeScript support
- **Error Handling**: Comprehensive error handling and validation

## Installation

```bash
# Using npm
npm install dolt-dbstore

# Using yarn
yarn add dolt-dbstore

# Using pnpm
pnpm add dolt-dbstore
```

## Usage

```javascript
import DoltDBStore from 'dolt-dbstore';

// Initialize store with a schema name
const store = new DoltDBStore('users');

// Create
const user = store.save({ 
  name: 'John Doe', 
  email: 'john@example.com',
  createdAt: new Date()
});

// Read
const foundUser = store.get(user.id);

// Update
const updatedUser = store.update(user.id, { 
  name: 'Jane Doe',
  updatedAt: new Date()
});

// Delete
const isDeleted = store.delete(user.id);

// Get all entries
const allUsers = store.getAll();

// Advanced usage
const filteredUsers = store.getAll().filter(user => user.name.includes('John'));
```

## API Reference

### DoltDBStore(schemaName, options?)
- `schemaName` (string): Unique identifier for the storage collection
- `options` (Object): Optional configuration
  - `prefix` (string): Storage key prefix
  - `serializer` (Function): Custom serialization function
  - `deserializer` (Function): Custom deserialization function

### Methods

#### save(data)
Stores data with an automatically generated ID.
- `data` (Object): Data to store
- Returns: `Object` - Stored object with generated ID
- Throws: `ValidationError` if data is invalid

#### get(id)
Retrieves a single entry by ID.
- `id` (string): Entry ID
- Returns: `Object | null` - Found entry or null
- Throws: `TypeError` if ID is invalid

#### update(id, newData)
Updates an existing entry.
- `id` (string): Entry ID
- `newData` (Object): Updated data
- Returns: `Object | null` - Updated entry or null
- Throws: `ValidationError` if data is invalid

#### delete(id)
Removes an entry by ID.
- `id` (string): Entry ID
- Returns: `boolean` - Success status
- Throws: `TypeError` if ID is invalid

#### getAll()
Retrieves all entries.
- Returns: `Array<Object>` - Array of all entries
- Note: Returns empty array if no entries exist

## Development Guide

### Project Structure

```
src/
├── core/
│   ├── storageWrapper.js     # LocalStorage implementation
│   └── index.js             # Core exports and types
├── utils/
│   ├── keyGenerator.js      # UUID generation utility
│   ├── serializer.js        # JSON serialization handlers
│   └── index.js            # Utils exports
├── types/
│   └── index.d.ts          # TypeScript definitions
└── index.js                # Main entry point
```

### Building

1. Install dependencies:
```bash
npm install
```

2. Build for development:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- path/to/test
```

### Coding Guidelines

1. **Code Style**
   - Follow airbnb-base style guide
   - Use 2 spaces for indentation
   - Max line length: 80 characters

2. **Documentation**
   - Write JSDoc comments for all public functions
   - Include examples in documentation
   - Document error cases and edge scenarios

3. **Testing**
   - Maintain >90% test coverage
   - Write unit tests for all features
   - Include edge cases in tests

4. **Git Workflow**
   - Use semantic commit messages
   - Branch naming: feature/, bugfix/, hotfix/
   - Squash commits before merging

### Publishing

1. Prepare for release
```bash
# Update version
npm version [major|minor|patch]

# Run tests
npm test

# Build project
npm run build
```

2. Publishing process
```bash
# Login to npm
npm login

# Publish package
npm publish

# Create git tag
git tag v$(node -p "require('./package.json').version")
git push origin --tags
```

3. Post-release
   - Update changelog
   - Create GitHub release
   - Update documentation

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Support

- GitHub Issues: [dolt-dbstore/issues](https://github.com/doltlabs/dolt-dbstore/issues)
- Email: contactus@doltlabs.in
- Documentation: [dolt-dbstore/docs](https://github.com/doltlabs/dolt-dbstore/docs)

## Security

- Report security issues via email: security@doltlabs.in
- Follow responsible disclosure guidelines
- Regular security audits conducted
