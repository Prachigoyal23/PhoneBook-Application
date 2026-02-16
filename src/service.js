class PhonebookService {
    constructor(storage) {
        this.storage = storage;
        this.contacts = this.storage.read();
    }

    getAllContacts() {
        return this.contacts;
    }

    addContact(name, phone) {
        if (!name || !phone) {
            throw new Error('Name and phone are required.');
        }
        const newContact = {
            id: Date.now().toString(),
            name,
            phone
        };
        this.contacts.push(newContact);
        this.storage.write(this.contacts);
        return newContact;
    }

    updateContact(id, updatedData) {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error('Contact not found.');
        }
        this.contacts[index] = { ...this.contacts[index], ...updatedData };
        this.storage.write(this.contacts);
        return this.contacts[index];
    }

    deleteContact(id) {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(c => c.id !== id);
        if (this.contacts.length === initialLength) {
            throw new Error('Contact not found.');
        }
        this.storage.write(this.contacts);
    }

    searchContacts(query) {
        const lowerQuery = query.toLowerCase();
        return this.contacts.filter(c => 
            c.name.toLowerCase().includes(lowerQuery) || 
            c.phone.includes(lowerQuery)
        );
    }
}

module.exports = PhonebookService;
