const sqlite3 = require('sqlite3').verbose();
const path = require('path');
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
    // Fixed: Use path.join with __dirname for better path resolution
    const packagedDbPath = path.join(__dirname, "crescent_pod.db");

    if (!fs.existsSync(dbPath)) {
        try {
            // Check if the packaged DB exists first
            if (fs.existsSync(packagedDbPath)) {
                fs.copyFileSync(packagedDbPath, dbPath);
                console.log("✅ Copied default DB to userData folder:", dbPath);
            } else {
                console.log("📝 Creating new database at:", dbPath);
                // Database will be created when we instantiate sqlite3.Database
            }
        } catch (err) {
            console.error("❌ Failed to copy DB:", err);
        }
    }
}

const db = new sqlite3.Database(dbPath);

// Create tables if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        "id" INTEGER NOT NULL,
        "username" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS client (
        "id" INTEGER NOT NULL,
        "client_name" TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    )`);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS pod_form (
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
            const columns = [
                'client_id', 'dated', 'consigneeName', 'blAwbNo', 'goodsDescription',
                'totalPackages', 'totalGrossWeight', 'totalNetWeight', 'vessel',
                'igmVirNo', 'noOfPackages', 'containerNo', 'machineNoDate',
                'vehicleNoType', 'driverName', 'driverTel', 'deliveryPerson',
                'phoneNo', 'pickupAddress', 'deliveryAddress', 'contactPersonCell',
                'remarks'
            ];

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

            const placeholders = columns.map(() => '?').join(', ');
            const insertSql = `INSERT INTO pod_form(${columns.join(', ')}) VALUES (${placeholders})`;

            db.run(insertSql, values, function (err) {
                if (err) {
                    console.error("Error inserting form data:", err.message);
                    reject(err);
                } else {
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

    // Fixed: Removed SQL injection vulnerability
    getFormByDate: (date) => {
        return new Promise((resolve, reject) => {
            const searchTerm = `%${date}%`;
            db.all('SELECT * FROM pod_form WHERE dated LIKE ? ORDER BY id DESC', [searchTerm], (err, rows) => {
                if (err) {
                    console.error("Error retrieving forms by date:", err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Fixed: Removed duplicate function definition
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