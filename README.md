# Phonebook Application

A simple command-line Phonebook application built with Node.js.

## Instructions on How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone or download the project folder.
2. Navigate to the project directory in your terminal/command prompt.

### Running the Program
Run the following command to start the application:
```bash
node app.js
```

## Key Design Decisions and Assumptions

### Architecture
The application follows a layered architecture to ensure separation of concerns:
- **Application Layer (`app.js`)**: Handles user interaction and command-line menu logic using the `readline` module.
- **Service Layer (`src/service.js`)**: Contains business logic for adding, searching, updating, and deleting contacts.
- **Storage Layer (`src/storage.js`)**: Manages data persistence, reading from and writing to the local filesystem.

### Design Decisions
- **Synchronous File I/O**: For simplicity and reliability in a single-user CLI environment, file operations are performed synchronously.
- **ID Generation**: Contacts are assigned unique IDs based on the current timestamp (`Date.now()`).
- **Data Validation**: Basic validation ensures that name and phone fields are provided before a contact is saved.

### Assumptions
- The application is intended for local, single-user use.
- Names and phone numbers are stored as strings.
- The `data` directory and `phonebook.json` file will be automatically created if they don't exist.

## Details of Data Storage

- **Storage Type**: File-based storage.
- **File Location**: `data/phonebook.json`.
- **Format**: Data is stored as a JSON array of contact objects. Each object includes an `id`, `name`, and `phone`.

Example format:
```json
[
  {
    "id": "1739723507000",
    "name": "John Doe",
    "phone": "123-456-7890"
  }
]
```
