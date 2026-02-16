const readline = require('readline');
const path = require('path');
const Storage = require('./src/storage');
const PhonebookService = require('./src/service');

const storagePath = path.join(__dirname, 'data', 'phonebook.json');
const storage = new Storage(storagePath);
const phonebook = new PhonebookService(storage);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n--- Phonebook Application ---');
    console.log('1. Add Contact');
    console.log('2. Search Contacts');
    console.log('3. List All Contacts');
    console.log('4. Update Contact');
    console.log('5. Delete Contact');
    console.log('6. Exit');
    rl.question('Select an option (1-6): ', handleMenuSelection);
}

function handleMenuSelection(choice) {
    switch (choice.trim()) {
        case '1':
            addContact();
            break;
        case '2':
            searchContacts();
            break;
        case '3':
            listContacts();
            break;
        case '4':
            updateContact();
            break;
        case '5':
            deleteContact();
            break;
        case '6':
            console.log('Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid choice. Please try again.');
            showMenu();
            break;
    }
}

function addContact() {
    rl.question('Enter name: ', (name) => {
        rl.question('Enter phone number: ', (phone) => {
            try {
                const contact = phonebook.addContact(name.trim(), phone.trim());
                console.log('Contact added successfully!', contact);
            } catch (error) {
                console.error('Error:', error.message);
            }
            showMenu();
        });
    });
}

function searchContacts() {
    rl.question('Enter search query: ', (query) => {
        const results = phonebook.searchContacts(query.trim());
        if (results.length > 0) {
            console.log('Search Results:', results);
        } else {
            console.log('No contacts found.');
        }
        showMenu();
    });
}

function listContacts() {
    const contacts = phonebook.getAllContacts();
    if (contacts.length > 0) {
        console.log('All Contacts:', contacts);
    } else {
        console.log('Phonebook is empty.');
    }
    showMenu();
}

function updateContact() {
    rl.question('Enter the ID of the contact to update: ', (id) => {
        rl.question('Enter new name (leave blank to keep current): ', (name) => {
            rl.question('Enter new phone number (leave blank to keep current): ', (phone) => {
                const updatedData = {};
                if (name.trim()) updatedData.name = name.trim();
                if (phone.trim()) updatedData.phone = phone.trim();

                try {
                    const contact = phonebook.updateContact(id.trim(), updatedData);
                    console.log('Contact updated successfully!', contact);
                } catch (error) {
                    console.error('Error:', error.message);
                }
                showMenu();
            });
        });
    });
}

function deleteContact() {
    rl.question('Enter the ID of the contact to delete: ', (id) => {
        try {
            phonebook.deleteContact(id.trim());
            console.log('Contact deleted successfully!');
        } catch (error) {
            console.error('Error:', error.message);
        }
        showMenu();
    });
}

console.log('Welcome to the Phonebook Application!');
showMenu();
