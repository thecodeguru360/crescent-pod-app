const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// const dbPath = path.resolve(__dirname, 'crescent_pod.db');

const fs = require("fs");
const { app } = require("electron");
const isDev = require("electron-is-dev");

const devDbPath = path.resolve(__dirname, "crescent_pod.db");
const prodDbPath = path.join(app.getPath("userData"), "crescent_pod.db");

let dbPath;

if (isDev) {
    dbPath = devDbPath;
} else {
    dbPath = prodDbPath;

    // If DB doesn't exist yet in userData, copy it from packaged resources
    const packagedDbPath = path.join(process.resourcesPath, "database/crescent_pod.db");

    if (!fs.existsSync(dbPath)) {
        try {
            fs.copyFileSync(packagedDbPath, dbPath);
            console.log("✅ Copied default DB to userData folder:", dbPath);
        } catch (err) {
            console.error("❌ Failed to copy DB:", err);
        }
    }
}

const db = new sqlite3.Database(dbPath);

// Create tables if not exists

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS  users (
	"id"	INTEGER NOT NULL,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)`)
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS  client (
	"id"	INTEGER NOT NULL,
	"client_name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)`)
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS  pod_form (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    dated TEXT,
    consigneeName TEXT,
    blAwbNo TEXT,
    goodsDescription TEXT,
    totalPackages TEXT,
    totalGrossWeight TEXT,
    totalNetWeight TEXT,
    vessel TEXT,
    igmVirNo TEXT,
    noOfPackages TEXT,
    containerNo TEXT,
    machineNoDate TEXT,
    vehicleNoType TEXT,
    driverName TEXT,
    driverTel TEXT,
    deliveryPerson TEXT,
    phoneNo TEXT,
    pickupAddress TEXT,
    deliveryAddress TEXT,
    contactPersonCell TEXT,
    remarks TEXT
)`);
});

module.exports = {

    addClient: (client_name) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO client(client_name) VALUES (?)', [client_name], function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, client_name });
            });
        });
    },
    getClientByName: (clientName) => {
        return new Promise((resolve, reject) => {
            // Using LIKE for partial matching, and wrapping the search term with '%'
            // This allows for autocomplete functionality (e.g., searching "Jo" finds "John Doe")
            const searchTerm = `%${clientName}%`;
            db.all('SELECT id, client_name FROM client WHERE client_name LIKE ?', [searchTerm], (err, rows) => {
                if (err) {
                    console.error("Error retrieving client by name:", err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    getClients: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM client', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    getAllForm: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM pod_form', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    getRecentForms: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT id,dated,consigneeName FROM pod_form ORDER BY id DESC LIMIT 30', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },
    addForm: (formData) => {
        return new Promise((resolve, reject) => {
            // Define the columns in the order they appear in the INSERT statement
            const columns = [
                'client_id', 'dated', 'consigneeName', 'blAwbNo', 'goodsDescription',
                'totalPackages', 'totalGrossWeight', 'totalNetWeight', 'vessel',
                'igmVirNo', 'noOfPackages', 'containerNo', 'machineNoDate',
                'vehicleNoType', 'driverName', 'driverTel', 'deliveryPerson',
                'phoneNo', 'pickupAddress', 'deliveryAddress', 'contactPersonCell',
                'remarks'
            ];

            // Map formData keys to an array of values, ensuring order matches columns
            const values = [
                formData.client_id || null,
                formData.dated || null,
                formData.consigneeName || null,
                formData.blAwbNo || null,
                formData.goodsDescription || null,
                formData.totalPackages || null,
                formData.totalGrossWeight || null,
                formData.totalNetWeight || null,
                formData.vessel || null,
                formData.igmVirNo || null,
                formData.noOfPackages || null,
                formData.containerNo || null,
                formData.machineNoDate || null,
                formData.vehicleNoType || null,
                formData.driverName || null,
                formData.driverTel || null,
                formData.deliveryPerson || null,
                formData.phoneNo || null,
                formData.pickupAddress || null,
                formData.deliveryAddress || null,
                formData.contactPersonCell || null,
                formData.remarks || null
            ];

            // Create placeholders for the values in the SQL query
            const placeholders = columns.map(() => '?').join(', ');
            const insertSql = `INSERT INTO pod_form(${columns.join(', ')}) VALUES (${placeholders})`;

            db.run(insertSql, values, function (err) {
                if (err) {
                    console.error("Error inserting form data:", err.message);
                    reject(err);
                } else {
                    // 'this.lastID' will contain the ID of the last inserted row
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                    resolve({ id: this.lastID, message: "Form data inserted successfully." });
                }
            });
        });
    },
    getFormById: (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM pod_form WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    getFormByDate: (date) => {
        const searchTerm = `%${date}%`;
        const query = `SELECT * FROM pod_form WHERE dated LIKE '${searchTerm}' ORDER BY id DESC`
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    getFormByClientId: (id) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM pod_form WHERE client_id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    getFormByClientId: (clientId) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM pod_form WHERE client_id = ?', [clientId], (err, rows) => {
                if (err) {
                    console.error("Error retrieving forms by client ID:", err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};
