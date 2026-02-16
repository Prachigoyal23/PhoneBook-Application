const path = require('path');
const fs = require('fs');
const Storage = require('./src/storage');
const PhonebookService = require('./src/service');

const testStoragePath = path.join(__dirname, 'data', 'test_phonebook.json');

// Clean up previous test data
if (fs.existsSync(testStoragePath)) {
    fs.unlinkSync(testStoragePath);
}

const storage = new Storage(testStoragePath);
const phonebook = new PhonebookService(storage);

console.log('--- Starting Verification ---');

// 1. Add Contacts
console.log('Adding contacts...');
const c1 = phonebook.addContact('Alice', '1112223333');
const c2 = phonebook.addContact('Bob', '4445556666');
console.log('Added:', c1, c2);

// 2. Search
console.log('Searching for "Bob"...');
const searchResult = phonebook.searchContacts('Bob');
console.log('Result:', searchResult);
if (searchResult.length !== 1 || searchResult[0].name !== 'Bob') {
    throw new Error('Search failed');
}

// 3. Update
console.log('Updating Alice...');
const updatedAlice = phonebook.updateContact(c1.id, { phone: '9999999999' });
console.log('Updated:', updatedAlice);
if (updatedAlice.phone !== '9999999999') {
    throw new Error('Update failed');
}

// 4. Delete
console.log('Deleting Bob...');
phonebook.deleteContact(c2.id);
const allContacts = phonebook.getAllContacts();
console.log('All contacts after deletion:', allContacts);
if (allContacts.length !== 1 || allContacts[0].name !== 'Alice') {
    throw new Error('Deletion failed');
}

console.log('--- Verification Successful! ---');

// Clean up
fs.unlinkSync(testStoragePath);
