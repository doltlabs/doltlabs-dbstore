# Dolt Labs dbStore - Offline-First Key-Value Database Wrapper

**dbStore** is a lightweight and powerful JavaScript library for building offline-first applications. It provides an easy-to-use key-value database wrapper that connects to the browser's `localStorage` and supports automatic ID generation based on JavaScript class schemas. This makes it easy to store and manage data, even when users are offline, and access it across sessions.

### Features

- **Offline-First**: Persistent data storage in the browser, even without an internet connection.
- **Simple API**: Provides an easy-to-use interface for storing, retrieving, updating, and deleting data.
- **Automatic ID Generation**: Automatically generates unique IDs for data entries based on a JavaScript class schema.
- **Key-Value Database**: Leverages the built-in `localStorage` for simple key-value data storage.
- **Lightweight**: Minimalist library with no dependencies, designed for speed and simplicity.

---

## Installation

### Using CDN

You can include **dbStore** in your project by adding the following `<script>` tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/doltdbStore@1.0.0/dist/doltdbStore.js"></script>
```

### Using npm

To install **dbStore** via npm, run:

```bash
npm install doltvault
```

Then, you can import it into your JavaScript project:

```javascript
import DoltDbStore from 'doltdbStore';
```

---

## How It Works

**dbStore** interacts with the browser's `localStorage` to store data in a key-value format. It uses **JavaScript classes** to define the schema for your data and automatically generates a unique ID for each instance of that class when saved.

### Key Concepts

1. **Schema Class**: A JavaScript class that defines the structure of the data.
2. **Storage**: Data is stored in `localStorage`, indexed by an automatically generated or user-defined key.
3. **CRUD Operations**: You can Create, Read, Update, and Delete entries in the storage.

---

## Usage

### 1. Defining a Schema Class

First, define a JavaScript class to represent the data structure you want to store. For example, let's create a `User` class with properties like `username`, `email`, and `fullName`.

```javascript
class User {
  constructor(username, email, fullName) {
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
```

### 2. Initializing dbStore

Next, initialize **dbStore** with a unique schema name. This will represent the storage collection for the data.

```javascript
const userDb = new DoltDbStore('users');
```

### 3. Saving Data

Now, you can create a new user and save it to the `localStorage`.

```javascript
const user = new User('john_doe', 'john@example.com', 'John Doe');

// Save the user to localStorage
userDb.save(user);
```

By default, **DoltVault** will automatically generate a unique ID for the `User` object if you don't provide one. This ID is stored in `localStorage` along with the data.

### 4. Retrieving Data

You can retrieve a specific user by their unique ID:

```javascript
const retrievedUser = userDb.get(user.id);
console.log(retrievedUser);
```

### 5. Updating Data

To update a user's data, you can simply modify the object and save it again:

```javascript
user.fullName = 'Johnathan Doe';
user.updatedAt = new Date();

// Update the user in localStorage
userDb.update(user.id, user);
```

### 6. Deleting Data

To delete a user from the storage, use the `delete` method:

```javascript
userDb.delete(user.id);
```

### 7. Listing All Entries

To retrieve all the stored entries in the database, use:

```javascript
const allUsers = userDb.getAll();
console.log(allUsers);
```

---

## API Reference

### 1. **`DoltDbStore` Constructor**

```javascript
const db = new DoltDbStore(schemaName);
```

- **Parameters**:
  - `schemaName` (String): The name of the schema (used to identify the data in `localStorage`).

### 2. **`save(data)`**

```javascript
db.save(data);
```

- **Parameters**:
  - `data` (Object): The data object to save. It must be an instance of the schema class.
  
- **Returns**: The saved object, with an `id` property assigned (if not already provided).

- **Description**: Saves a new data entry to `localStorage`. If no `id` is provided, it generates one based on the schema class.

### 3. **`get(id)`**

```javascript
const data = db.get(id);
```

- **Parameters**:
  - `id` (String): The unique ID of the entry to retrieve.

- **Returns**: The data object corresponding to the ID.

- **Description**: Retrieves an entry by its unique ID.

### 4. **`update(id, data)`**

```javascript
db.update(id, data);
```

- **Parameters**:
  - `id` (String): The unique ID of the entry to update.
  - `data` (Object): The updated data object.

- **Returns**: The updated data object.

- **Description**: Updates an existing data entry.

### 5. **`delete(id)`**

```javascript
db.delete(id);
```

- **Parameters**:
  - `id` (String): The unique ID of the entry to delete.

- **Returns**: `undefined`.

- **Description**: Deletes an entry from the database.

### 6. **`getAll()`**

```javascript
const data = db.getAll();
```

- **Returns**: An array of all data entries stored in `localStorage`.

- **Description**: Retrieves all entries from the database.

---

## Advanced Usage

### Storing More Complex Objects

You can store more complex objects in **DoltDbStore** by defining multiple schema classes and using them together:

```javascript
class Post {
  constructor(title, content, author) {
    this.title = title;
    this.content = content;
    this.author = author; // Reference to a User object
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
```

You can save and link a `Post` object to a `User` object:

```javascript
const post = new Post('My First Post', 'This is the content of the post.', user);
userDb.save(user);
const postDb = new DoltDbStore('posts');
postDb.save(post);
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For support, please feel free to open an issue on our [GitHub Issues Page]([https://github.com/DoltLabs/doltvault](https://github.com/doltlabs/dolt-dbstore/issues) or reach out via email at **contactus@doltlabs.in**.
