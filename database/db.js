const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'notes.db');
const db = new sqlite3.Database(dbPath);

// Create table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
  )`);
});

module.exports = {
    getAllNotes: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM notes', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    addNote: (content) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO notes(content) VALUES (?)', [content], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, content });
            });
        });
    },
};
