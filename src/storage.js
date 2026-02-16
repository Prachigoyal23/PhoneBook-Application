const fs = require('fs');
const path = require('path');

class Storage {
    constructor(filePath) {
        this.filePath = filePath;
        this.ensureDirExists();
    }

    ensureDirExists() {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    read() {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading storage file:', error);
            return [];
        }
    }

    write(data) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            console.error('Error writing to storage file:', error);
        }
    }
}

module.exports = Storage;
