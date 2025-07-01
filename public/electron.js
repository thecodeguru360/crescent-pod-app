const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const dbModules = require('../database/db');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../database/crescent_pod.db');
const sqlite3 = require('sqlite3').verbose();



function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            devTools: true,
            preload: path.resolve(__dirname, "./preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    console.log("Preload path:", path.join(__dirname, "preload.js"));

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

ipcMain.handle('add-form', async (event, formData) => {
    return dbModules.addForm(formData);
});
ipcMain.handle('add-client', async (event, client_name) => {
    return dbModules.addClient(client_name);
});
ipcMain.handle('get-recent-forms', async (event) => {
    return dbModules.getRecentForms();
});
ipcMain.handle('get-form-by-id', async (event, form_id) => {
    return dbModules.getFormById(form_id);
});
ipcMain.handle('get-form-by-date', async (event, date) => {
    return dbModules.getFormByDate(date);
});
ipcMain.handle('get-form-by-client-id', async (event, client_id) => {
    return dbModules.getFormByClientId(client_id);
});
ipcMain.handle('get-client-by-name', async (event, client_name) => {
    return dbModules.getClientByName(client_name);
});
ipcMain.handle('get-clients', async () => {
    return dbModules.getClients();
});

// Import / Export section

ipcMain.handle('export-sql', async () => {
    const { filePath, canceled } = await dialog.showSaveDialog({
        defaultPath: 'crescent_pod_backup' + new Date().toISOString() + '.sql',
        filters: [{ name: 'SQL Dump', extensions: ['sql'] }],
    });

    if (canceled || !filePath) return { status: 'cancelled' };


    const db = new sqlite3.Database(dbPath);
    const dumpLines = [];

    console.log("DB path for export:", dbPath);

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", (err, tables) => {
                if (err) {
                    console.error("Failed to read tables:", err.message);
                    return reject({ status: 'error', message: 'Failed to read tables' });
                }

                if (!tables.length) {
                    try {
                        fs.writeFileSync(filePath, '-- Empty database\n', 'utf-8');
                        db.close();
                        return resolve({ status: 'success', message: 'Empty DB exported' });
                    } catch (writeErr) {
                        console.error("Write error:", writeErr);
                        return reject({ status: 'error', message: 'Failed to write file' });
                    }
                }

                let tableIndex = 0;

                const processNextTable = () => {
                    if (tableIndex >= tables.length) {
                        try {
                            fs.writeFileSync(filePath, dumpLines.join('\n'), 'utf-8');
                            db.close();
                            console.log("Export complete:", filePath);
                            return resolve({ status: 'success', message: 'SQL export complete' });
                        } catch (err) {
                            console.error("Failed to write SQL file:", err);
                            db.close();
                            return reject({ status: 'error', message: 'Could not save SQL file' });
                        }
                    }

                    const table = tables[tableIndex];
                    const safeCreate = table.sql.replace(
                        /^CREATE TABLE/i,
                        'CREATE TABLE IF NOT EXISTS'
                    );
                    dumpLines.push(`${safeCreate};`);

                    db.all(`SELECT * FROM ${table.name}`, (err, rows) => {
                        if (!err && rows.length > 0) {
                            rows.forEach((row) => {
                                const keys = Object.keys(row).map(k => `"${k}"`).join(', ');
                                const values = Object.values(row)
                                    .map(v => (v === null ? 'NULL' : `'${v.toString().replace(/'/g, "''")}'`))
                                    .join(', ');
                                dumpLines.push(`INSERT INTO ${table.name} (${keys}) VALUES (${values});`);
                            });
                        }

                        tableIndex++;
                        processNextTable(); // continue after async completes
                    });
                };

                processNextTable(); // kick off table processing
            });
        });
    });
});


ipcMain.handle('import-sql', async () => {
    const { filePaths, canceled } = await dialog.showOpenDialog({
        filters: [{ name: 'SQL Dump', extensions: ['sql'] }],
        properties: ['openFile'],
    });

    if (canceled || !filePaths.length) return { status: 'cancelled' };

    const sqlScript = fs.readFileSync(filePaths[0], 'utf-8');
    const db = new sqlite3.Database(dbPath);

    // Extract all table names from CREATE TABLE statements
    const tableMatches = [...sqlScript.matchAll(/CREATE TABLE IF NOT EXISTS ["`]?(.*?)["`]?[\s(]/gi)];
    const tableNames = tableMatches.map(match => match[1]);

    console.log("Importing tables:", tableNames);

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("PRAGMA foreign_keys = OFF;");
            db.run("BEGIN TRANSACTION;");

            // Step 1: Delete from all tables first
            for (const tableName of tableNames) {
                db.run(`DELETE FROM "${tableName}";`, (err) => {
                    if (err) console.warn(`Warning: Failed to delete from ${tableName}`, err.message);
                });
            }

            // Step 2: Run the full SQL dump
            db.exec(sqlScript, (err) => {
                if (err) {
                    console.error("Import failed:", err);
                    db.run("ROLLBACK;");
                    db.close();
                    return reject({ status: 'error', message: 'SQL import failed' });
                }

                db.run("COMMIT;");
                db.close();
                console.log("SQL import complete");
                return resolve({ status: 'success', message: 'SQL import complete' });
            });
        });
    });
});

